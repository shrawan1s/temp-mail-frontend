import { IVerifyPaymentResponse } from './payment.interface';
import { BillingCycle } from '@/enums';

/**
 * Options for the useRazorpay hook
 */
export interface IUseRazorpayOptions {
    onSuccess?: (response: IVerifyPaymentResponse) => void;
    onError?: (error: Error) => void;
    onCancel?: () => void;
}

/**
 * Return type for the useRazorpay hook
 */
export interface IUseRazorpayReturn {
    initiatePayment: (
        planId: string,
        billingCycle: BillingCycle,
        planName: string
    ) => Promise<void>;
    isLoading: boolean;
    error: Error | null;
}
