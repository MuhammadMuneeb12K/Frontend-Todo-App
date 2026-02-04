import axios from 'axios';
import { storeAuthTokens, clearAuthTokens, getAuthTokens } from './auth';
import { ApiError } from '@/types/api';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const tokens = getAuthTokens();
    if (tokens?.access_token) {
      config.headers.Authorization = `Bearer ${tokens.access_token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 with token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const tokens = getAuthTokens();
      if (tokens?.refresh_token) {
        try {
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/refresh-token`,
            { refresh_token: tokens.refresh_token }
          );
          storeAuthTokens(data);
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
          originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          clearAuthTokens();
          if (typeof window !== 'undefined') {
            window.location.href = '/signin';
          }
          return Promise.reject(refreshError);
        }
      }
    }

    // Transform axios error to ApiError
    if (error.response) {
      const statusCode = error.response.status;
      const detail = error.response.data?.detail || error.response.data?.message || 'An error occurred';
      throw new ApiError(statusCode, detail);
    }

    // Network or other errors
    throw new ApiError(500, 'Network error or server is unavailable');
  }
);

export const getAccessToken = (): string | null => {
    if (typeof window === 'undefined') return null;
    const tokens = localStorage.getItem('authTokens');
    return tokens ? JSON.parse(tokens).access_token : null;
};

export const setTokens = (tokens: { access_token: string; refresh_token: string }): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('authTokens', JSON.stringify(tokens));
};

export const clearTokens = (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('authTokens');
};


export default apiClient;