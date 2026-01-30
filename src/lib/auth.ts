import { IAuthResponse, IRegisterResponse, ISimpleResponse, IUserResponse, ISettingsResponse } from '@/interfaces';
import { api } from './api';

// Auth API functions
export const authApi = {
  register: async (data: { email: string; password: string; name: string }) => {
    return api.post<IRegisterResponse>('/auth/register', data);
  },

  verifyEmail: async (data: { userId: string; code: string }) => {
    return api.post<IAuthResponse>('/auth/verify-email', {
      user_id: data.userId,
      code: data.code,
    });
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
    return api.post<IAuthResponse>('/auth/refresh', { refresh_token: refreshToken });
  },

  requestPasswordReset: async (data: { email: string }) => {
    return api.post<ISimpleResponse>('/auth/password-reset/request', data);
  },

  oauthLogin: async (data: { provider: string; code: string; redirectUri: string }) => {
    return api.post<IAuthResponse>('/auth/oauth', {
      provider: data.provider,
      code: data.code,
      redirect_uri: data.redirectUri,
    });
  },

  resetPassword: async (data: { token: string; newPassword: string }) => {
    return api.post<ISimpleResponse>('/auth/password-reset/confirm', {
      token: data.token,
      new_password: data.newPassword,
    });
  },

  getMe: async () => {
    return api.get<IUserResponse>('/auth/me');
  },

  updateMe: async (data: { name?: string; avatarUrl?: string }) => {
    return api.put<IUserResponse>('/auth/me', {
      name: data.name,
      avatar_url: data.avatarUrl,
    });
  },

  // Settings
  getSettings: async () => {
    return api.get<ISettingsResponse>('/auth/settings');
  },

  updateSettings: async (data: {
    darkMode?: boolean;
    autoRefresh?: boolean;
    emailExpiry?: string;
    notifications?: boolean;
    blockedSenders?: string[];
  }) => {
    return api.put<ISettingsResponse>('/auth/settings', {
      dark_mode: data.darkMode,
      auto_refresh: data.autoRefresh,
      email_expiry: data.emailExpiry,
      notifications: data.notifications,
      blocked_senders: data.blockedSenders,
    });
  },

  // Account Management
  changePassword: async (data: { currentPassword: string; newPassword: string }) => {
    return api.post<ISimpleResponse>('/auth/change-password', {
      current_password: data.currentPassword,
      new_password: data.newPassword,
    });
  },

  deleteAccount: async (data: { password?: string }) => {
    return api.post<ISimpleResponse>('/auth/delete-account', data);
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
