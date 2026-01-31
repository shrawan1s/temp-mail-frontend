'use client';

import { useState, useCallback } from 'react';
import { paymentApi } from '@/lib';
import { 
    IRazorpayPaymentResponse, 
    IRazorpayPaymentError, 
    IRazorpayOptions,
    IRazorpayConstructor,
    IUseRazorpayOptions
} from '@/interfaces';
import { BillingCycle } from '@/enums';

declare global {
    interface Window {
        Razorpay: IRazorpayConstructor;
    }
}

export function useRazorpay(options: IUseRazorpayOptions = {}) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const loadRazorpayScript = useCallback((): Promise<boolean> => {
        return new Promise((resolve) => {
            if (window.Razorpay) {
                resolve(true);
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    }, []);

    const initiatePayment = useCallback(
        async (planId: string, billingCycle: BillingCycle, planName: string) => {
            setIsLoading(true);
            setError(null);

            try {
                // Load Razorpay script if not loaded
                const loaded = await loadRazorpayScript();
                if (!loaded) {
                    throw new Error('Failed to load Razorpay SDK');
                }

                // Create order via centralized API client (includes auth token)
                const orderData = await paymentApi.createOrder(planId, billingCycle);

                // Open Razorpay checkout
                const razorpayOptions: IRazorpayOptions = {
                    key: orderData.razorpayKeyId,
                    amount: orderData.amount,
                    currency: orderData.currency,
                    name: 'Temp Email',
                    description: `${planName} Plan - ${billingCycle === BillingCycle.ANNUAL ? 'Annual' : 'Monthly'}`,
                    order_id: orderData.orderId,
                    handler: async (response: IRazorpayPaymentResponse) => {
                        try {
                            // Verify payment via centralized API client
                            const result = await paymentApi.verifyPayment(
                                response.razorpay_order_id,
                                response.razorpay_payment_id,
                                response.razorpay_signature
                            );

                            if (result.success) {
                                options.onSuccess?.(result);
                            } else {
                                throw new Error(result.message || 'Payment verification failed');
                            }
                        } catch (err) {
                            const error = err instanceof Error ? err : new Error('Payment verification failed');
                            setError(error);
                            options.onError?.(error);
                        } finally {
                            setIsLoading(false);
                        }
                    },
                    prefill: {
                        name: '',
                        email: '',
                        contact: '',
                    },
                    theme: {
                        color: '#3b82f6',
                    },
                    modal: {
                        ondismiss: () => {
                            setIsLoading(false);
                            options.onCancel?.();
                        },
                    },
                };

                const rzp = new window.Razorpay(razorpayOptions);
                rzp.on('payment.failed', (response: IRazorpayPaymentError) => {
                    const error = new Error(response.error.description || 'Payment failed');
                    setError(error);
                    options.onError?.(error);
                    setIsLoading(false);
                });

                rzp.open();
            } catch (err) {
                const error = err instanceof Error ? err : new Error('Failed to initiate payment');
                setError(error);
                options.onError?.(error);
                setIsLoading(false);
            }
        },
        [loadRazorpayScript, options]
    );

    return {
        initiatePayment,
        isLoading,
        error,
    };
}
