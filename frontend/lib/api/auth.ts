import apiClient from './client';
import { SignInRequest, SignUpRequest, AuthResponse, User } from '@/types/auth';

export const getAuthTokens = (): AuthResponse | null => {
  if (typeof window === 'undefined') return null;
  const tokens = localStorage.getItem('authTokens');
  return tokens ? JSON.parse(tokens) : null;
};

export const storeAuthTokens = (tokens: AuthResponse): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('authTokens', JSON.stringify(tokens));
  }
};

export const clearAuthTokens = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authTokens');
  }
};

export const signin = async (credentials: SignInRequest): Promise<AuthResponse> => {
  const response = await apiClient.post('/api/v1/auth/signin', credentials);
  if (response.data.access_token && response.data.refresh_token) {
    storeAuthTokens(response.data);
  }
  return response.data;
};

export const signup = async (userData: SignUpRequest): Promise<AuthResponse> => {
  const response = await apiClient.post('/api/v1/auth/signup', userData);
  if (response.data.access_token && response.data.refresh_token) {
    storeAuthTokens(response.data);
  }
  return response.data;
};

export const signout = (): void => {
  clearAuthTokens();
  if (typeof window !== 'undefined') {
    window.location.href = '/signin';
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  const tokens = getAuthTokens();
  if (!tokens) return null;

  try {
    const response = await apiClient.get('/api/v1/users/me');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch current user', error);
    return null;
  }
};

export const refreshToken = async (): Promise<AuthResponse | null> => {
    const tokens = getAuthTokens();
    if (!tokens?.refresh_token) return null;

    try {
        const response = await apiClient.post('/api/v1/auth/refresh-token', {
            refresh_token: tokens.refresh_token,
        });
        if (response.data.access_token) {
            storeAuthTokens(response.data);
        }
        return response.data;
    } catch (error) {
        console.error('Failed to refresh token', error);
        signout(); // Force sign out if refresh fails
        return null;
    }
};