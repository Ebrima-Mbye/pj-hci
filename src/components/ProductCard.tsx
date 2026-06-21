"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/products";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3 h-3 ${star <= Math.round(rating) ? "text-amber-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [adding, setAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (adding) return;
    setAdding(true);
    addToCart(product);
    setTimeout(() => setAdding(false), 1200);
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const badgeColors: Record<string, string> = {
    Sale: "bg-red-500 text-white",
    New: "bg-indigo-600 text-white",
    Bestseller: "bg-amber-400 text-gray-900",
  };

  return (
    <article className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-indigo-200 hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Badge */}
      {product.badge && (
        <span
          className={`absolute top-3 left-3 z-10 text-xs font-bold px-2.5 py-1 rounded-full ${badgeColors[product.badge] ?? "bg-gray-200 text-gray-800"}`}
          aria-label={
            product.badge === "Sale" && discount
              ? `${discount}% off`
              : product.badge
          }
        >
          {product.badge === "Sale" && discount
            ? `-${discount}%`
            : product.badge}
        </span>
      )}

      {/* Product image */}
      <Link
        href={`/shop/${product.id}`}
        className="block relative aspect-square overflow-hidden bg-gray-50"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <p className="text-xs text-indigo-600 font-semibold uppercase tracking-wider">
          {product.category}
        </p>
        <h3 className="text-sm font-semibold text-gray-900 leading-snug">
          <Link
            href={`/shop/${product.id}`}
            className="hover:text-indigo-600 transition-colors line-clamp-2"
          >
            {product.name}
          </Link>
        </h3>

        <div className="flex items-center gap-2">
          <StarRating rating={product.rating} />
          <span className="text-xs text-gray-500">
            {product.rating} ({product.reviews.toLocaleString()})
          </span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={adding}
            className={`p-2 rounded-xl transition-all duration-200 focus-visible:outline-2 focus-visible:outline-indigo-500 ${
              adding
                ? "bg-green-500 text-white scale-90"
                : "bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white"
            }`}
            aria-label={adding ? "Added!" : `Add ${product.name} to cart`}
          >
            {adding ? (
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
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
