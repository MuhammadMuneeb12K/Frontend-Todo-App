"use client";

import { useToastContext } from "@/contexts/ToastContext";

export interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

interface UseToastReturn {
  showToast: (message: string, type: Toast["type"]) => void;
}

export const useToast = (): UseToastReturn => {
  const { showToast } = useToastContext();

  return { showToast };
};
