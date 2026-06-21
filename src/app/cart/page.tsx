"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

type CheckoutField = "name" | "email" | "address" | "city" | "card";

interface FormState {
  name: string;
  email: string;
  address: string;
  city: string;
  card: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  address?: string;
  city?: string;
  card?: string;
}

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Full name is required.";
  else if (form.name.trim().length < 2)
    errors.name = "Name must be at least 2 characters.";

  if (!form.email.trim()) errors.email = "Email address is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "Please enter a valid email address.";

  if (!form.address.trim()) errors.address = "Delivery address is required.";
  if (!form.city.trim()) errors.city = "City is required.";

  if (!form.card.trim()) errors.card = "Card number is required.";
  else if (!/^\d{16}$/.test(form.card.replace(/\s/g, "")))
    errors.card = "Please enter a valid 16-digit card number.";

  return errors;
}

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } =
    useCart();
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    address: "",
    city: "",
    card: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<CheckoutField, boolean>>
  >({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const shipping = totalPrice >= 50 ? 0 : 5.99;
  const tax = totalPrice * 0.08;
  const total = totalPrice + shipping + tax;

  const handleChange = (field: CheckoutField, value: string) => {
    const next = { ...form, [field]: value };
    setForm(next);
    if (touched[field]) {
      setErrors(validate(next));
    }
  };

  const handleBlur = (field: CheckoutField) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(form));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = {
      name: true,
      email: true,
      address: true,
      city: true,
      card: true,
    };
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setOrderPlaced(true);
      clearCart();
    }
  };

  // Order placed confirmation
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div
          className="bg-white rounded-3xl shadow-xl p-12 max-w-md w-full text-center"
          role="status"
          aria-live="polite"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-green-500"
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
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-3">
            Order Placed!
          </h1>
          <p className="text-gray-500 mb-2">
            Thank you, <strong>{form.name.split(" ")[0]}</strong>! Your order is
            confirmed.
          </p>
          <p className="text-gray-400 text-sm mb-8">
            A confirmation email has been sent to <strong>{form.email}</strong>.
          </p>
          <div className="bg-gray-50 rounded-2xl p-4 mb-8 text-sm">
            <p className="font-semibold text-gray-900">Order Summary</p>
            <p className="text-gray-500 mt-1">
              Total charged:{" "}
              <strong className="text-gray-900">${total.toFixed(2)}</strong>
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // Empty cart
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-black text-gray-900 mb-3">
            Your cart is empty
          </h1>
          <p className="text-gray-500 mb-8">
            Looks like you haven&apos;t added anything yet. Explore our products
            and find something you love!
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-colors text-sm"
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
                strokeWidth={2.5}
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black text-gray-900 mb-8">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Cart items ── */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(({ product, quantity }) => (
              <article
                key={product.id}
                className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4"
              >
                {/* Product image */}
                <Link
                  href={`/shop/${product.id}`}
                  className="flex-shrink-0 relative w-20 h-20 rounded-xl overflow-hidden bg-gray-50 border border-gray-100"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs text-indigo-600 font-semibold">
                        {product.category}
                      </p>
                      <h2 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2">
                        <Link
                          href={`/shop/${product.id}`}
                          className="hover:text-indigo-600 transition-colors"
                        >
                          {product.name}
                        </Link>
                      </h2>
                    </div>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="flex-shrink-0 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      aria-label={`Remove ${product.name} from cart`}
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Quantity controls */}
                    <div
                      className="flex items-center border border-gray-200 rounded-lg overflow-hidden"
                      role="group"
                      aria-label={`Quantity for ${product.name}`}
                    >
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-40 text-lg leading-none"
                        aria-label="Decrease quantity"
                        disabled={quantity <= 1}
                      >
                        −
                      </button>
                      <span
                        className="w-8 text-center text-sm font-bold text-gray-900"
                        aria-live="polite"
                      >
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-lg leading-none"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Line total */}
                    <p className="text-sm font-black text-gray-900">
                      ${(product.price * quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </article>
            ))}

            {/* Clear cart */}
            <div className="flex justify-end">
              <button
                onClick={clearCart}
                className="text-sm text-red-500 hover:text-red-700 font-semibold transition-colors"
                aria-label="Remove all items from cart"
              >
                Clear cart
              </button>
            </div>
          </div>

          {/* ── Order summary + checkout ── */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-20">
              <h2 className="text-lg font-black text-gray-900 mb-5">
                Order Summary
              </h2>

              <dl className="space-y-3 text-sm mb-5">
                <div className="flex justify-between text-gray-600">
                  <dt>Subtotal</dt>
                  <dd className="font-semibold text-gray-900">
                    ${totalPrice.toFixed(2)}
                  </dd>
                </div>
                <div className="flex justify-between text-gray-600">
                  <dt>Shipping</dt>
                  <dd
                    className={`font-semibold ${shipping === 0 ? "text-green-600" : "text-gray-900"}`}
                  >
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </dd>
                </div>
                <div className="flex justify-between text-gray-600">
                  <dt>Tax (8%)</dt>
                  <dd className="font-semibold text-gray-900">
                    ${tax.toFixed(2)}
                  </dd>
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between">
                  <dt className="font-black text-gray-900">Total</dt>
                  <dd className="font-black text-lg text-indigo-600">
                    ${total.toFixed(2)}
                  </dd>
                </div>
              </dl>

              {totalPrice < 50 && (
                <p className="text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded-lg mb-4">
                  Add <strong>${(50 - totalPrice).toFixed(2)}</strong> more for
                  free shipping!
                </p>
              )}

              {!showCheckout ? (
                <button
                  onClick={() => setShowCheckout(true)}
                  className="w-full py-3.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors text-sm"
                >
                  Proceed to Checkout
                </button>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  noValidate
                  aria-label="Checkout form"
                >
                  <h3 className="text-sm font-bold text-gray-900 border-t border-gray-100 pt-4">
                    Delivery & Payment
                  </h3>

                  {(
                    [
                      {
                        id: "name",
                        label: "Full Name",
                        type: "text",
                        placeholder: "Ebrima Mbye",
                        autoComplete: "name",
                      },
                      {
                        id: "email",
                        label: "Email Address",
                        type: "email",
                        placeholder: "you@example.com",
                        autoComplete: "email",
                      },
                      {
                        id: "address",
                        label: "Street Address",
                        type: "text",
                        placeholder: "123 Main Street",
                        autoComplete: "street-address",
                      },
                      {
                        id: "city",
                        label: "City",
                        type: "text",
                        placeholder: "Banjul",
                        autoComplete: "address-level2",
                      },
                      {
                        id: "card",
                        label: "Card Number",
                        type: "text",
                        placeholder: "1234 5678 9012 3456",
                        autoComplete: "cc-number",
                      },
                    ] as Array<{
                      id: CheckoutField;
                      label: string;
                      type: string;
                      placeholder: string;
                      autoComplete: string;
                    }>
                  ).map((field) => (
                    <div key={field.id}>
                      <label
                        htmlFor={field.id}
                        className="block text-xs font-semibold text-gray-700 mb-1"
                      >
                        {field.label}{" "}
                        <span className="text-red-500" aria-hidden="true">
                          *
                        </span>
                      </label>
                      <input
                        id={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        autoComplete={field.autoComplete}
                        value={form[field.id]}
                        onChange={(e) => handleChange(field.id, e.target.value)}
                        onBlur={() => handleBlur(field.id)}
                        className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                          errors[field.id] && touched[field.id]
                            ? "border-red-400 focus:ring-red-200 bg-red-50"
                            : "border-gray-200 focus:ring-indigo-200 focus:border-indigo-400"
                        }`}
                        aria-required="true"
                        aria-invalid={!!(errors[field.id] && touched[field.id])}
                        aria-describedby={
                          errors[field.id] && touched[field.id]
                            ? `${field.id}-error`
                            : undefined
                        }
                      />
                      {errors[field.id] && touched[field.id] && (
                        <p
                          id={`${field.id}-error`}
                          className="mt-1 text-xs text-red-600 flex items-center gap-1"
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
                          {errors[field.id]}
                        </p>
                      )}
                    </div>
                  ))}

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 active:scale-95 transition-all text-sm mt-2"
                  >
                    Place Order · ${total.toFixed(2)}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCheckout(false)}
                    className="w-full py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    ← Back to Cart
                  </button>
                </form>
              )}

              <Link
                href="/shop"
                className="flex items-center justify-center gap-1.5 mt-4 text-xs text-gray-400 hover:text-indigo-600 transition-colors"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16l-4-4m0 0l4-4m-4 4h18"
                  />
                </svg>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
