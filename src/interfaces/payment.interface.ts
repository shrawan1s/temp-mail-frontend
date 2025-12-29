export interface IPlan {
  id: string;
  key: string;
  name: string;
  description: string;
  priceMonthly: number;
  priceAnnual: number;
  features: string[];
  isPopular: boolean;
}

export interface ICreateOrderResponse {
  orderId: string;
  amount: number;
  currency: string;
  razorpayKeyId: string;
}

export interface IVerifyPaymentResponse {
  success: boolean;
  message: string;
  planKey?: string;
  expiresAt?: string;
}

export interface ISubscription {
  planKey: string;
  planName: string;
  status: string;
  billingCycle: string;
  expiresAt: string;
}

export interface IPlansResponse {
  plans: IPlan[];
}
