"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubscribed(true);
  };

  if (subscribed) {
    return (
      <div
        className="flex items-center justify-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 px-6 py-3 rounded-full max-w-sm mx-auto"
        role="status"
        aria-live="polite"
      >
        <svg
          className="w-4 h-4 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M5 13l4 4L19 7"
          />
        </svg>
        You&apos;re subscribed! Welcome to NOVA.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      noValidate
      aria-label="Newsletter signup"
    >
      <div className="flex-1">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
          className={`w-full px-4 py-3 rounded-full border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
            error ? "border-red-400 bg-red-50" : "border-gray-200"
          }`}
          required
          autoComplete="email"
          aria-required="true"
          aria-invalid={!!error}
          aria-describedby={error ? "newsletter-error" : undefined}
        />
        {error && (
          <p
            id="newsletter-error"
            className="mt-1.5 text-xs text-red-600 text-left pl-2"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-colors text-sm whitespace-nowrap flex-shrink-0"
      >
        Subscribe
      </button>
    </form>
  );
}
