/**
 * Razorpay type definitions for payment integration.
 */
export interface IRazorpayPaymentResponse {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}

export interface IRazorpayPaymentError {
    error: {
        code: string;
        description: string;
        source: string;
        step: string;
        reason: string;
    };
}

export interface IRazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    order_id: string;
    handler: (response: IRazorpayPaymentResponse) => void;
    prefill: {
        name: string;
        email: string;
        contact: string;
    };
    theme: {
        color: string;
    };
    modal: {
        ondismiss: () => void;
    };
}

export interface IRazorpayInstance {
    open: () => void;
    on: (event: string, handler: (response: IRazorpayPaymentError) => void) => void;
    close: () => void;
}

export interface IRazorpayConstructor {
    new (options: IRazorpayOptions): IRazorpayInstance;
}
