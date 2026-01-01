import { IApiError, IAuthResponse } from '@/interfaces';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * API Client with automatic token refresh.
 * When a 401 is received, attempts to refresh the access token
 * and retry the original request once.
 */
class ApiClient {
  private baseUrl: string;
  private isRefreshing = false;
  private refreshPromise: Promise<boolean> | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('access_token');
  }

  private getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('refresh_token');
  }

  private setTokens(accessToken: string, refreshToken: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
    }
  }

  private clearTokens(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  }

  private getAuthHeader(): Record<string, string> {
    const token = this.getAccessToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  /**
   * Attempt to refresh the access token using the refresh token.
   * Returns true if refresh was successful, false otherwise.
   */
  private async refreshAccessToken(): Promise<boolean> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      this.clearTokens();
      return false;
    }

    try {
      const response = await fetch(`${this.baseUrl}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        this.clearTokens();
        return false;
      }

      const data: IAuthResponse = await response.json();

      if (data.success && data.access_token && data.refresh_token) {
        this.setTokens(data.access_token, data.refresh_token);
        return true;
      }

      this.clearTokens();
      return false;
    } catch {
      this.clearTokens();
      return false;
    }
  }

  /**
   * Handle token refresh with request queueing.
   * If a refresh is already in progress, wait for it to complete.
   */
  private async handleTokenRefresh(): Promise<boolean> {
    // If already refreshing, wait for the existing refresh to complete
    if (this.isRefreshing && this.refreshPromise) {
      return this.refreshPromise;
    }

    this.isRefreshing = true;
    this.refreshPromise = this.refreshAccessToken();

    try {
      const result = await this.refreshPromise;
      return result;
    } finally {
      this.isRefreshing = false;
      this.refreshPromise = null;
    }
  }

  /**
   * Make an HTTP request with automatic token refresh on 401.
   */
  async request<T>(
    endpoint: string,
    options: RequestInit = {},
    isRetry = false
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...this.getAuthHeader(),
      ...(options.headers as Record<string, string> || {}),
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Handle 401 Unauthorized - try to refresh token
    if (response.status === 401 && !isRetry) {
      const refreshSuccess = await this.handleTokenRefresh();

      if (refreshSuccess) {
        // Retry the original request with new token
        return this.request<T>(endpoint, options, true);
      }

      // Refresh failed - throw to trigger logout
      throw new Error('Session expired. Please login again.');
    }

    const data = await response.json();

    if (!response.ok) {
      const error = data as IApiError;
      throw new Error(error.message || 'Request failed');
    }

    return data as T;
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async put<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const api = new ApiClient(API_URL as string);
