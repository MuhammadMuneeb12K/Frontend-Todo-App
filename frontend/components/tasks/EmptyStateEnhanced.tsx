"use client";

import React from "react";
import { CheckSquare, Plus } from "lucide-react";

const EmptyStateEnhanced: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center animate-fade-in">
      {/* Icon */}
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center mb-6">
        <CheckSquare className="w-10 h-10 text-indigo-500" />
      </div>

      {/* Text */}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">No tasks yet</h3>
      <p className="text-gray-600 mb-6 max-w-sm">
        Get started by creating your first task. Stay organized and boost your productivity!
      </p>

      {/* Illustration or CTA */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Plus className="w-4 h-4" />
        <span>Click "Create Task" above to add your first task</span>
      </div>

      {/* Optional: Add a decorative element */}
      <div className="mt-8 flex gap-2">
        <div className="w-2 h-2 rounded-full bg-indigo-300 animate-pulse"></div>
        <div className="w-2 h-2 rounded-full bg-purple-300 animate-pulse delay-75"></div>
        <div className="w-2 h-2 rounded-full bg-pink-300 animate-pulse delay-150"></div>
      </div>
    </div>
  );
};

export default EmptyStateEnhanced;
