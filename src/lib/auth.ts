import { IAuthResponse, IRegisterResponse, ISimpleResponse, IUserResponse } from '@/interfaces';
import { api } from './api';

// Auth API functions
export const authApi = {
  register: async (data: { email: string; password: string; name: string }) => {
    return api.post<IRegisterResponse>('/auth/register', data);
  },

  verifyEmail: async (data: { userId: string; code: string }) => {
    return api.post<IAuthResponse>('/auth/verify-email', data);
  },

  resendVerification: async (data: { email: string }) => {
    return api.post<ISimpleResponse>('/auth/resend-verification', data);
  },

  login: async (data: { email: string; password: string }) => {
    return api.post<IAuthResponse>('/auth/login', data);
  },

  logout: async () => {
    return api.post<ISimpleResponse>('/auth/logout');
  },

  refreshToken: async (refreshToken: string) => {
    return api.post<IAuthResponse>('/auth/refresh', { refreshToken });
  },

  requestPasswordReset: async (data: { email: string }) => {
    return api.post<ISimpleResponse>('/auth/password-reset/request', data);
  },

  resetPassword: async (data: { token: string; newPassword: string }) => {
    return api.post<ISimpleResponse>('/auth/password-reset/confirm', data);
  },

  getMe: async () => {
    return api.get<IUserResponse>('/auth/me');
  },

  updateMe: async (data: { name?: string; avatarUrl?: string }) => {
    return api.put<IUserResponse>('/auth/me', data);
  },
};

// Token management
export const tokenStorage = {
  setTokens: (accessToken: string, refreshToken: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
    }
  },

  getAccessToken: () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('access_token');
  },

  getRefreshToken: () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('refresh_token');
  },

  clearTokens: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  },

  hasTokens: () => {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('access_token');
  },
};
