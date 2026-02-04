"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { getEmailError, getPasswordError } from "@/lib/utils/validation";
import { ApiErrorResponse } from "@/types/api";
import { Mail, Lock, ArrowRight } from "lucide-react";

const SignInForm: React.FC = () => {
  const router = useRouter();
  const { signin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>(
    {}
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({});

    // Validate inputs
    const emailError = getEmailError(email);
    const passwordError = getPasswordError(password);

    if (emailError || passwordError) {
      setErrors({
        email: emailError || undefined,
        password: passwordError || undefined,
      });
      return;
    }

    setIsLoading(true);

    try {
      await signin({ email, password });
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof ApiErrorResponse) {
        if (error.statusCode === 401) {
          setErrors({ general: "Invalid email or password" });
        } else {
          setErrors({ general: error.message || "An error occurred during sign in" });
        }
      } else {
        setErrors({ general: "An unexpected error occurred" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            disabled={isLoading}
            required
            className={`
              w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
              ${
                errors.email
                  ? "border-red-300 bg-red-50"
                  : "border-gray-300 bg-white hover:border-gray-400"
              }
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <span>⚠</span> {errors.email}
          </p>
        )}
      </div>

      {/* Password Input */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
            disabled={isLoading}
            required
            className={`
              w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
              ${
                errors.password
                  ? "border-red-300 bg-red-50"
                  : "border-gray-300 bg-white hover:border-gray-400"
              }
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          />
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <span>⚠</span> {errors.password}
          </p>
        )}
      </div>

      {/* General Error */}
      {errors.general && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg animate-slide-in" role="alert">
          <p className="text-sm text-red-600 font-medium">{errors.general}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className={`
          w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg
          font-semibold transition-all duration-200
          ${
            isLoading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-indigo-500 text-white hover:bg-indigo-600 hover:shadow-lg hover:-translate-y-0.5"
          }
        `}
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Signing in...
          </>
        ) : (
          <>
            Sign In
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>

      {/* Sign Up Link */}
      <p className="text-center text-sm text-gray-600 pt-4 border-t border-gray-200">
        Don&apos;t have an account?{" "}
        <a href="/signup" className="text-indigo-600 hover:text-indigo-700 font-semibold">
          Sign up for free
        </a>
      </p>
    </form>
  );
};

export default SignInForm;
