
// User type definition
export interface User {
  id: string;
  email: string;
  name?: string;
  is_active?: boolean;
  is_superuser?: boolean;
}

// Authentication tokens
export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  token_type?: string;
}

// Authentication state
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  tokens: AuthTokens | null;
}

// Auth API request types
export interface SignUpRequest {
  email: string;
  password: string;
  full_name?: string;
}

export interface SignInRequest {
  username: string;
  password: string;
}

// Auth API response types
export interface AuthResponse extends AuthTokens {
}

