"use client";

import React, { createContext, useState, useEffect, useCallback } from "react";
import { User, AuthState, AuthTokens } from "@/types/auth";
import { signin, signup, signout, storeAuthTokens, getAuthTokens } from "@/lib/api/auth";
import { getAccessToken, clearTokens } from "@/lib/api/client";
import { SignInRequest, SignUpRequest } from "@/types/auth";

export interface AuthContextType extends AuthState {
  signin: (data: SignInRequest) => Promise<void>;
  signup: (data: SignUpRequest) => Promise<void>;
  signout: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useState<AuthTokens | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing auth token on mount
  useEffect(() => {
    const initAuth = async () => {
      const storedTokens = getAuthTokens();

      if (storedTokens) {
        setTokens(storedTokens);
        // TODO: Optionally verify token with backend or decode JWT to get user info
        // For now, we'll just set isAuthenticated based on token presence
        // In a real app, you might want to fetch user profile here
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const handleSignIn = useCallback(async (data: SignInRequest) => {
    setIsLoading(true);
    try {
      const response = await signin(data);
      storeAuthTokens(response);
      setTokens(response);
      setUser(response.user);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
    setIsLoading(false);
  }, []);

  const handleSignUp = useCallback(async (data: SignUpRequest) => {
    setIsLoading(true);
    try {
      const response = await signup(data);
      storeAuthTokens(response);
      setTokens(response);
      setUser(response.user);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
    setIsLoading(false);
  }, []);

  const handleSignOut = useCallback(async () => {
    setIsLoading(true);
    try {
      await signout();
      setUser(null);
      setTokens(null);
    } catch (error) {
      console.error("Signout error:", error);
      // Clear user even if signout fails
      setUser(null);
      setTokens(null);
    }
    setIsLoading(false);
  }, []);

  const value: AuthContextType = {
    user,
    tokens,
    isAuthenticated: !!user,
    isLoading,
    signin: handleSignIn,
    signup: handleSignUp,
    signout: handleSignOut,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
