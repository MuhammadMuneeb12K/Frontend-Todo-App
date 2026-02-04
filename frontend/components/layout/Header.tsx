"use client";

import React from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
  const { user, signout, isAuthenticated } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signout();
    router.push("/signin");
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Todo App</h1>
          </div>

          {isAuthenticated && (
            <div className="flex items-center gap-3 sm:gap-4">
              {user && (
                <span className="text-sm text-gray-600 hidden sm:inline">
                  {user.name || user.email}
                </span>
              )}
              <Button variant="secondary" size="sm" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
