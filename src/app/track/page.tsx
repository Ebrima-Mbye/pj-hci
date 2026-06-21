"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  findOrderById,
  getSimulatedStatus,
  getStepEstimate,
  TRACKING_STEPS,
  STATUS_ORDER,
  type StoredOrder,
  type OrderStatus,
} from "@/lib/orders";

/* ── Tiny spinner used in Suspense fallback ── */
function Spinner() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div
        className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"
        aria-label="Loading"
      />
    </div>
  );
}

/* ── Status badge ── */
function StatusBadge({ status }: { status: OrderStatus }) {
  const config: Record<OrderStatus, { label: string; className: string }> = {
    placed: { label: "Order Placed", className: "bg-blue-100 text-blue-700" },
    processing: {
      label: "Processing",
      className: "bg-amber-100 text-amber-700",
    },
    packed: { label: "Packed", className: "bg-purple-100 text-purple-700" },
    shipped: { label: "Shipped", className: "bg-indigo-100 text-indigo-700" },
    out_for_delivery: {
      label: "Out for Delivery",
      className: "bg-orange-100 text-orange-700",
    },
    delivered: { label: "Delivered", className: "bg-green-100 text-green-700" },
  };
  const { label, className } = config[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${className}`}
    >
      {status === "out_for_delivery" || status === "shipped" ? (
        <span
          className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"
          aria-hidden="true"
        />
      ) : null}
      {label}
    </span>
  );
}

/* ── Vertical tracking timeline ── */
function TrackingTimeline({ order }: { order: StoredOrder }) {
  const currentStatus = getSimulatedStatus(order.placedAt);
  const currentIndex = STATUS_ORDER.indexOf(currentStatus);

  return (
    <ol className="relative" aria-label="Order tracking timeline">
      {TRACKING_STEPS.map((step, i) => {
        const isCompleted = i < currentIndex;
        const isCurrent = i === currentIndex;
        const isPending = i > currentIndex;

        return (
          <li key={step.status} className="flex gap-4 pb-8 last:pb-0">
            {/* Icon column */}
            <div className="flex flex-col items-center">
              <div
                className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all ${
                  isCompleted
                    ? "bg-indigo-600 border-indigo-600"
                    : isCurrent
                      ? "bg-white border-indigo-600"
                      : "bg-white border-gray-200"
                }`}
                aria-hidden="true"
              >
                {isCompleted ? (
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <svg
                    className={`w-4 h-4 ${isCurrent ? "text-indigo-600" : "text-gray-300"}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={step.icon}
                    />
                  </svg>
                )}
                {/* Pulse ring for active step */}
                {isCurrent && (
                  <span
                    className="absolute inset-0 rounded-full border-2 border-indigo-400 animate-ping opacity-75"
                    aria-hidden="true"
                  />
                )}
              </div>
              {/* Connector line */}
              {i < TRACKING_STEPS.length - 1 && (
                <div
                  className={`w-0.5 flex-1 mt-1 min-h-[2rem] ${
                    isCompleted ? "bg-indigo-600" : "bg-gray-200"
                  }`}
                  aria-hidden="true"
                />
              )}
            </div>

            {/* Content */}
            <div
              className={`flex-1 pt-1.5 pb-2 ${isPending ? "opacity-40" : ""}`}
            >
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <h3
                  className={`text-sm font-bold ${isCurrent ? "text-indigo-700" : isCompleted ? "text-gray-900" : "text-gray-500"}`}
                >
                  {step.label}
                  {isCurrent && (
                    <span className="ml-2 text-xs font-semibold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                      Current
                    </span>
                  )}
                </h3>
                <span className="text-xs text-gray-400 flex-shrink-0">
                  {getStepEstimate(step.status, order.placedAt)}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                {step.description}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/* ── Order summary card ── */
function OrderSummaryCard({ order }: { order: StoredOrder }) {
  const currentStatus = getSimulatedStatus(order.placedAt);
  const estimatedDelivery = getStepEstimate("delivered", order.placedAt);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <p className="text-xs text-gray-500 mb-1">Order ID</p>
            <p className="font-black text-gray-900 text-lg tracking-wide">
              {order.id}
            </p>
          </div>
          <StatusBadge status={currentStatus} />
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-xs text-gray-500">Placed on</p>
            <p className="font-semibold text-gray-900">
              {new Date(order.placedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Est. Delivery</p>
            <p className="font-semibold text-gray-900">{estimatedDelivery}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Customer</p>
            <p className="font-semibold text-gray-900">{order.customerName}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Deliver to</p>
            <p className="font-semibold text-gray-900 truncate">{order.city}</p>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
          Items in this Order
        </h3>
        <ul className="space-y-3">
          {order.items.map((item, i) => (
            <li key={i} className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {item.name}
                </p>
                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p className="text-sm font-bold text-gray-900 flex-shrink-0">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-4 pt-4 border-t border-gray-100 space-y-1.5 text-sm">
          <div className="flex justify-between text-gray-500">
            <span>Subtotal</span>
            <span>${order.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Shipping</span>
            <span
              className={
                order.shipping === 0 ? "text-green-600 font-semibold" : ""
              }
            >
              {order.shipping === 0 ? "Free" : `$${order.shipping.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Tax</span>
            <span>${order.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-black text-gray-900 pt-2 border-t border-gray-100">
            <span>Total</span>
            <span className="text-indigo-600">${order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Search form ── */
function TrackingSearch({ defaultId }: { defaultId: string }) {
  const [inputId, setInputId] = useState(defaultId);
  const [order, setOrder] = useState<StoredOrder | null | "loading">("loading");
  const [searched, setSearched] = useState(false);
  const [inputError, setInputError] = useState("");

  // Auto-search if we have an ID from URL
  useEffect(() => {
    if (defaultId) {
      const found = findOrderById(defaultId);
      setOrder(found);
      setSearched(true);
    } else {
      setOrder(null);
    }
  }, [defaultId]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputId.trim()) {
      setInputError("Please enter your order ID.");
      return;
    }
    setInputError("");
    const found = findOrderById(inputId.trim());
    setOrder(found);
    setSearched(true);
  };

  const isLoading = order === "loading";
  const foundOrder = order && order !== "loading" ? order : null;
  const notFound = searched && !foundOrder && !isLoading;

  return (
    <div className="space-y-8">
      {/* Search bar */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row gap-3"
        aria-label="Order tracking search"
      >
        <div className="flex-1">
          <label htmlFor="order-id-input" className="sr-only">
            Order ID
          </label>
          <input
            id="order-id-input"
            type="text"
            placeholder="e.g. NOV-2026-12345"
            value={inputId}
            onChange={(e) => {
              setInputId(e.target.value);
              if (inputError) setInputError("");
            }}
            className={`w-full px-5 py-3.5 rounded-2xl border text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${inputError ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"}`}
            aria-required="true"
            aria-invalid={!!inputError}
            aria-describedby={inputError ? "order-id-error" : undefined}
          />
          {inputError && (
            <p
              id="order-id-error"
              className="mt-1.5 text-xs text-red-600 flex items-center gap-1 pl-1"
              role="alert"
            >
              <svg
                className="w-3 h-3 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {inputError}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="px-7 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-colors text-sm flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          Track Order
        </button>
      </form>

      {/* Hint */}
      {!searched && (
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 text-sm text-indigo-700 flex gap-3">
          <svg
            className="w-5 h-5 flex-shrink-0 mt-0.5 text-indigo-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <p className="font-semibold mb-1">How to track your order</p>
            <p className="text-indigo-600">
              Enter the order ID from your confirmation page (e.g.,{" "}
              <span className="font-mono bg-indigo-100 px-1.5 py-0.5 rounded">
                NOV-2026-XXXXX
              </span>
              ). Your order ID is also displayed after checkout.
            </p>
          </div>
        </div>
      )}

      {/* Not found */}
      {notFound && (
        <div
          className="bg-white rounded-2xl border border-red-100 p-8 text-center"
          role="alert"
        >
          <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-7 h-7 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-black text-gray-900 mb-2">
            Order Not Found
          </h3>
          <p className="text-gray-500 text-sm mb-1">
            We couldn&apos;t find an order matching{" "}
            <strong className="font-mono text-gray-700">{inputId}</strong>.
          </p>
          <p className="text-gray-400 text-xs">
            Double-check the ID and try again. Orders are stored in this browser
            — if you cleared your data, the order may no longer be available.
          </p>
        </div>
      )}

      {/* Result */}
      {foundOrder && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          {/* Timeline — wider column */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-base font-black text-gray-900 mb-6">
              Tracking Timeline
            </h2>
            <TrackingTimeline order={foundOrder} />
          </div>

          {/* Order details */}
          <div className="lg:col-span-2">
            <OrderSummaryCard order={foundOrder} />
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Inner page that uses useSearchParams ── */
function TrackContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id") ?? "";
  return <TrackingSearch defaultId={orderId} />;
}

/* ── Page export ── */
export default function TrackPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-black text-gray-900">
              Track Your Order
            </h1>
          </div>
          <p className="text-gray-500 text-sm ml-12">
            Enter your order ID below to see real-time status updates.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<Spinner />}>
          <TrackContent />
        </Suspense>

        {/* Bottom links */}
        <div className="mt-10 flex flex-wrap gap-4 justify-center text-sm">
          <Link
            href="/shop"
            className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors"
          >
            ← Continue Shopping
          </Link>
          <span className="text-gray-300">|</span>
          <Link
            href="/contact"
            className="text-gray-500 hover:text-indigo-600 transition-colors"
          >
            Need help? Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
