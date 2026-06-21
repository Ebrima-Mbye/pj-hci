"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/products";

function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((s) => (
          <svg
            key={s}
            className={`w-4 h-4 ${s <= Math.round(rating) ? "text-amber-400" : "text-gray-200"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-sm text-gray-600 font-medium">{rating}</span>
      <span className="text-sm text-gray-400">
        ({reviews.toLocaleString()} reviews)
      </span>
    </div>
  );
}

export default function ProductDetailClient({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const badgeColors: Record<string, string> = {
    Sale: "bg-red-500 text-white",
    New: "bg-indigo-600 text-white",
    Bestseller: "bg-amber-400 text-gray-900",
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4"
        aria-label="Breadcrumb"
      >
        <ol
          className="flex items-center gap-2 text-sm text-gray-500"
          role="list"
        >
          <li>
            <Link href="/" className="hover:text-indigo-600 transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true">
            <span className="mx-1">/</span>
          </li>
          <li>
            <Link
              href="/shop"
              className="hover:text-indigo-600 transition-colors"
            >
              Shop
            </Link>
          </li>
          <li aria-hidden="true">
            <span className="mx-1">/</span>
          </li>
          <li>
            <Link
              href={`/shop?category=${encodeURIComponent(product.category)}`}
              className="hover:text-indigo-600 transition-colors"
            >
              {product.category}
            </Link>
          </li>
          <li aria-hidden="true">
            <span className="mx-1">/</span>
          </li>
          <li className="text-gray-900 font-medium truncate max-w-xs">
            {product.name}
          </li>
        </ol>
      </nav>

      {/* Product section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image */}
          <div className="relative">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-50 border border-gray-100">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            {product.badge && (
              <span
                className={`absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full ${badgeColors[product.badge] ?? ""}`}
              >
                {product.badge === "Sale" && discount
                  ? `-${discount}% OFF`
                  : product.badge}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-5">
            {/* Category & name */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-2">
                {product.category}
              </p>
              <h1 className="text-3xl font-black text-gray-900 leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Rating */}
            <StarRating rating={product.rating} reviews={product.reviews} />

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  {discount && (
                    <span className="text-sm font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                      Save {discount}%
                    </span>
                  )}
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed text-sm">
              {product.description}
            </p>

            {/* Features */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
                Key Features
              </h2>
              <ul className="grid grid-cols-2 gap-2" role="list">
                {product.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <span
                      className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0"
                      aria-hidden="true"
                    >
                      <svg
                        className="w-3 h-3 text-indigo-600"
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
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="border-t border-gray-100 pt-5 flex flex-col gap-4">
              {/* Quantity selector */}
              <div>
                <label
                  htmlFor="quantity"
                  className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block"
                >
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center border border-gray-200 rounded-xl overflow-hidden"
                    role="group"
                    aria-label="Quantity selector"
                  >
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-40"
                      aria-label="Decrease quantity"
                      disabled={quantity <= 1}
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
                          d="M20 12H4"
                        />
                      </svg>
                    </button>
                    <span
                      className="w-12 text-center text-sm font-bold text-gray-900"
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                      aria-label="Increase quantity"
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
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </button>
                  </div>
                  <span className="text-xs text-green-600 font-semibold flex items-center gap-1">
                    <span
                      className="w-2 h-2 bg-green-500 rounded-full inline-block"
                      aria-hidden="true"
                    />
                    In Stock
                  </span>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 ${
                    added
                      ? "bg-green-500 text-white"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95"
                  }`}
                  aria-label={
                    added ? "Added to cart!" : `Add ${quantity} to cart`
                  }
                >
                  {added ? (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                      Add to Cart
                    </>
                  )}
                </button>
                <Link
                  href="/cart"
                  className="flex-1 flex items-center justify-center py-3.5 rounded-xl font-bold text-sm border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition-colors"
                >
                  View Cart
                </Link>
              </div>
            </div>

            {/* Trust signals */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { icon: "🚚", text: "Free Shipping" },
                { icon: "↩️", text: "30-Day Returns" },
                { icon: "🔒", text: "Secure Checkout" },
              ].map((item) => (
                <div
                  key={item.text}
                  className="text-center p-3 bg-gray-50 rounded-xl"
                >
                  <span className="text-lg block mb-1" aria-hidden="true">
                    {item.icon}
                  </span>
                  <span className="text-xs text-gray-600 font-medium">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="bg-gray-50 py-16" aria-labelledby="related-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              id="related-heading"
              className="text-2xl font-black text-gray-900 mb-8"
            >
              You Might Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((rp) => {
                const rdiscount = rp.originalPrice
                  ? Math.round((1 - rp.price / rp.originalPrice) * 100)
                  : null;
                return (
                  <Link
                    key={rp.id}
                    href={`/shop/${rp.id}`}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all duration-200"
                  >
                    <div className="relative aspect-square bg-gray-50">
                      <Image
                        src={rp.image}
                        alt={rp.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-xs font-semibold text-gray-900 line-clamp-2">
                        {rp.name}
                      </p>
                      <div className="flex items-baseline gap-1.5 mt-1.5">
                        <span className="text-sm font-bold text-indigo-600">
                          ${rp.price.toFixed(2)}
                        </span>
                        {rp.originalPrice && rdiscount && (
                          <span className="text-xs text-gray-400 line-through">
                            ${rp.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
