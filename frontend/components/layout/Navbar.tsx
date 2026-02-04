"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Menu, Bell, User, LogOut, ChevronDown } from "lucide-react";
import { Menu as HeadlessMenu } from "@headlessui/react";

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const { user, signout, isAuthenticated } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signout();
    router.push("/signin");
  };

  const getUserInitials = () => {
    if (user?.name) {
      return user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return user?.email?.[0]?.toUpperCase() || "U";
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Left Section - Mobile Menu + Logo */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors md:hidden"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>

          {/* Logo - Mobile */}
          <div className="flex items-center gap-2 md:hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="text-lg font-bold text-gray-900">TaskFlow</span>
          </div>

          {/* Search Bar - Desktop (Optional - can be enabled later) */}
          {/* <div className="hidden lg:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search tasks..."
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div> */}
        </div>

        {/* Right Section - Notifications + Profile */}
        {isAuthenticated && (
          <div className="flex items-center gap-3">
            {/* Notifications Button (Optional) */}
            <button
              className="hidden sm:flex p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-gray-700" />
              {/* Notification Badge */}
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile Dropdown */}
            <HeadlessMenu as="div" className="relative">
              <HeadlessMenu.Button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {getUserInitials()}
                  </span>
                </div>

                {/* User Info - Desktop */}
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500 truncate max-w-[150px]">
                    {user?.email}
                  </p>
                </div>

                <ChevronDown className="w-4 h-4 text-gray-500 hidden sm:block" />
              </HeadlessMenu.Button>

              {/* Dropdown Menu */}
              <HeadlessMenu.Items className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 focus:outline-none animate-scale-in">
                {/* User Info - Mobile */}
                <div className="px-4 py-3 border-b border-gray-200 sm:hidden">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                </div>

                <HeadlessMenu.Item>
                  {({ active }) => (
                    <button
                      className={`w-full flex items-center gap-3 px-4 py-2 text-sm ${
                        active ? "bg-gray-50 text-gray-900" : "text-gray-700"
                      }`}
                    >
                      <User className="w-4 h-4" />
                      Profile Settings
                    </button>
                  )}
                </HeadlessMenu.Item>

                <div className="border-t border-gray-200 my-1"></div>

                <HeadlessMenu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleSignOut}
                      className={`w-full flex items-center gap-3 px-4 py-2 text-sm ${
                        active ? "bg-red-50 text-red-600" : "text-red-600"
                      }`}
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  )}
                </HeadlessMenu.Item>
              </HeadlessMenu.Items>
            </HeadlessMenu>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
