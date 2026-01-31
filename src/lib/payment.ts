import { 
  IPlan, 
  ICreateOrderResponse, 
  IVerifyPaymentResponse, 
  ISubscription,
  IApiResponse 
} from '@/interfaces';
import { api } from './api';

// Payment API functions
export const paymentApi = {
  /**
   * Get all available plans (public endpoint)
   */
  getPlans: async (): Promise<IPlan[]> => {
    const response = await api.get<IApiResponse<{ plans: IPlan[] }>>('/payment/plans');
    return response.data.plans;
  },

  /**
   * Create a Razorpay order
   * Note: userId is automatically extracted from the auth token on the backend
   */
  createOrder: async (
    planId: string,
    billingCycle: 'monthly' | 'annual'
  ): Promise<ICreateOrderResponse> => {
    const response = await api.post<IApiResponse<ICreateOrderResponse>>('/payment/create-order', {
      planId,
      billingCycle,
    });
    return response.data;
  },

  /**
   * Verify payment after Razorpay checkout
   * Note: userId is automatically extracted from the auth token on the backend
   */
  verifyPayment: async (
    orderId: string,
    paymentId: string,
    signature: string
  ): Promise<IVerifyPaymentResponse> => {
    const response = await api.post<IApiResponse<{ planKey: string; expiresAt: string }>>('/payment/verify', {
      orderId,
      paymentId,
      signature,
    });
    return {
      success: true,
      message: 'Payment verified',
      planKey: response.data.planKey,
      expiresAt: response.data.expiresAt,
    };
  },

  /**
   * Get user's current subscription
   */
  getSubscription: async (): Promise<ISubscription> => {
    const response = await api.get<IApiResponse<ISubscription>>('/payment/subscription');
    return response.data;
  },
};
