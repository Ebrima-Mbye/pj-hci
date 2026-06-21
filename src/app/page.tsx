import Link from "next/link";
import { getFeaturedProducts, categories } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import NewsletterForm from "@/components/NewsletterForm";

const categoryMeta: Record<
  string,
  { icon: string; count: number; color: string; bg: string }
> = {
  Electronics: {
    icon: `<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />`,
    count: 6,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  Clothing: {
    icon: `<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />`,
    count: 6,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  "Home & Living": {
    icon: `<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />`,
    count: 6,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  Beauty: {
    icon: `<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />`,
    count: 6,
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
};

const benefits = [
  {
    icon: `<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />`,
    title: "Free Shipping",
    desc: "On all orders over $50. Fast, reliable delivery right to your door.",
  },
  {
    icon: `<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />`,
    title: "Easy Returns",
    desc: "30-day hassle-free returns. Not satisfied? We make it right.",
  },
  {
    icon: `<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />`,
    title: "Secure Payment",
    desc: "256-bit SSL encryption keeps your payment info safe and secure.",
  },
  {
    icon: `<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />`,
    title: "24/7 Support",
    desc: "Our team is always here to help. Reach us anytime, anywhere.",
  },
];

const testimonials = [
  {
    name: "Amara Diallo",
    role: "Verified Buyer",
    rating: 5,
    text: "Absolutely love the quality of everything I ordered. The wireless headphones are incredible — the sound is crystal clear and the battery lasts forever. NOVA is my go-to store now!",
    avatar: "AD",
  },
  {
    name: "James Okonkwo",
    role: "Verified Buyer",
    rating: 5,
    text: "Shipping was super fast and the packaging was beautiful. Bought the leather jacket for my wife and she was over the moon. Will definitely be ordering again soon.",
    avatar: "JO",
  },
  {
    name: "Fatou Sanneh",
    role: "Verified Buyer",
    rating: 5,
    text: "The skincare products I ordered are genuinely amazing. My skin has never looked better. The customer service team was also very helpful when I had questions.",
    avatar: "FS",
  },
];

export default function Home() {
  const featured = getFeaturedProducts();
  const displayCategories = categories.filter((c) => c !== "All");

  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-900 text-white">
        {/* Decorative blobs */}
        <div
          className="absolute top-0 right-0 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block mb-4 text-xs font-bold uppercase tracking-widest text-indigo-300 bg-indigo-800/50 px-3 py-1.5 rounded-full">
              New Arrivals 2026
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6">
              Discover
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
                Premium Products
              </span>
              for Every Lifestyle
            </h1>
            <p className="text-lg text-indigo-200 mb-8 max-w-xl mx-auto md:mx-0 leading-relaxed">
              Shop curated electronics, fashion, home essentials, and beauty —
              all in one place. Quality you can trust, prices you'll love.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-indigo-900 font-bold rounded-full hover:bg-indigo-50 transition-colors duration-150 text-sm shadow-lg"
              >
                Shop Now
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
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-7 py-3.5 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-colors duration-150 text-sm"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Stats cards */}
          <div className="flex-shrink-0 grid grid-cols-2 gap-4 w-full max-w-xs">
            {[
              { value: "24+", label: "Products" },
              { value: "4", label: "Categories" },
              { value: "4.7★", label: "Avg Rating" },
              { value: "Free", label: "Shipping" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 text-center border border-white/10"
              >
                <p className="text-2xl font-black text-white">{stat.value}</p>
                <p className="text-xs text-indigo-300 font-medium mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section
        className="py-16 bg-gray-50"
        aria-labelledby="categories-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2
              id="categories-heading"
              className="text-3xl font-black text-gray-900 mb-3"
            >
              Shop by Category
            </h2>
            <p className="text-gray-500 max-w-md mx-auto">
              Find exactly what you're looking for across our curated
              collections.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {displayCategories.map((cat) => {
              const meta = categoryMeta[cat];
              return (
                <Link
                  key={cat}
                  href={`/shop?category=${encodeURIComponent(cat)}`}
                  className="group flex flex-col items-center p-6 bg-white rounded-2xl border border-gray-100 hover:border-indigo-200 hover:shadow-lg transition-all duration-300 text-center"
                >
                  <div
                    className={`w-14 h-14 ${meta.bg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}
                  >
                    <svg
                      className={`w-7 h-7 ${meta.color}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                      dangerouslySetInnerHTML={{ __html: meta.icon }}
                    />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">
                    {cat}
                  </h3>
                  <p className="text-xs text-gray-500">{meta.count} Products</p>
                  <span className="mt-3 text-xs font-semibold text-indigo-600 group-hover:translate-x-1 transition-transform duration-150 inline-flex items-center gap-1">
                    Browse
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="py-16" aria-labelledby="featured-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2
                id="featured-heading"
                className="text-3xl font-black text-gray-900 mb-2"
              >
                Our Bestsellers
              </h2>
              <p className="text-gray-500">
                Hand-picked products loved by thousands of customers.
              </p>
            </div>
            <Link
              href="/shop"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              View all
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-10 text-center sm:hidden">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-colors text-sm"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section
        className="py-16 bg-indigo-950 text-white"
        aria-labelledby="benefits-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="benefits-heading" className="sr-only">
            Why shop with us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="flex flex-col items-center text-center gap-3 p-6"
              >
                <div className="w-12 h-12 bg-indigo-800 rounded-2xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-indigo-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                    dangerouslySetInnerHTML={{ __html: b.icon }}
                  />
                </div>
                <h3 className="font-bold text-base">{b.title}</h3>
                <p className="text-indigo-300 text-sm leading-relaxed">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROMO BANNER ── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-r from-amber-400 to-orange-400 rounded-3xl overflow-hidden p-10 md:p-14 text-center">
            <div
              className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"
              aria-hidden="true"
            />
            <p className="text-xs font-bold uppercase tracking-widest text-amber-900 mb-3">
              Limited Time Offer
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Get 20% Off Your First Order
            </h2>
            <p className="text-amber-100 mb-8 max-w-md mx-auto">
              Use code <strong className="text-white">NOVA20</strong> at
              checkout. Valid on all products, today only.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-orange-700 font-bold rounded-full hover:bg-orange-50 transition-colors shadow-lg text-sm"
            >
              Shop & Save Now
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section
        className="py-16 bg-gray-50"
        aria-labelledby="testimonials-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2
              id="testimonials-heading"
              className="text-3xl font-black text-gray-900 mb-3"
            >
              What Our Customers Say
            </h2>
            <p className="text-gray-500">
              Join thousands of happy shoppers who trust NOVA.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col gap-4"
              >
                {/* Stars */}
                <div
                  className="flex gap-1"
                  aria-label={`${t.rating} out of 5 stars`}
                >
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-amber-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                  <div
                    className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold flex-shrink-0"
                    aria-hidden="true"
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {t.name}
                    </p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="py-16" aria-labelledby="newsletter-heading">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            id="newsletter-heading"
            className="text-3xl font-black text-gray-900 mb-3"
          >
            Stay in the Loop
          </h2>
          <p className="text-gray-500 mb-8">
            Get new arrivals, exclusive deals, and style inspiration delivered
            to your inbox.
          </p>
          <NewsletterForm />
          <p className="text-xs text-gray-400 mt-4">
            No spam, ever. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  );
}
