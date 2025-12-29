import { 
  IPlan, 
  ICreateOrderResponse, 
  IVerifyPaymentResponse, 
  ISubscription,
  IPlansResponse 
} from '@/interfaces';
import { api } from './api';

// Payment API functions
export const paymentApi = {
  /**
   * Get all available plans (public endpoint)
   */
  getPlans: async (): Promise<IPlan[]> => {
    const response = await api.get<IPlansResponse>('/payment/plans');
    return response.plans;
  },

  /**
   * Create a Razorpay order
   */
  createOrder: async (
    userId: string,
    planId: string,
    billingCycle: 'monthly' | 'annual'
  ): Promise<ICreateOrderResponse> => {
    return api.post<ICreateOrderResponse>('/payment/create-order', {
      userId,
      planId,
      billingCycle,
    });
  },

  /**
   * Verify payment after Razorpay checkout
   */
  verifyPayment: async (
    orderId: string,
    paymentId: string,
    signature: string,
    userId: string
  ): Promise<IVerifyPaymentResponse> => {
    return api.post<IVerifyPaymentResponse>('/payment/verify', {
      orderId,
      paymentId,
      signature,
      userId,
    });
  },

  /**
   * Get user's current subscription
   */
  getSubscription: async (): Promise<ISubscription> => {
    return api.get<ISubscription>('/payment/subscription');
  },
};
