"use client";

import { useCart } from "@/context/CartContext";

export default function Toast() {
  const { toast } = useCart();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 nova-toast-enter pointer-events-none">
      <div className="bg-gray-900 text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-2.5 text-sm font-medium whitespace-nowrap">
        <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </span>
        {toast}
      </div>
    </div>
  );
}
