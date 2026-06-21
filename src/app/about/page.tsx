import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us – NOVA Store",
  description:
    "Learn about NOVA Store — our mission, values, and the team behind the brand.",
};

const values = [
  {
    icon: `<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />`,
    title: "Quality First",
    desc: "Every product in our store goes through rigorous quality checks. We only sell what we would proudly use ourselves.",
  },
  {
    icon: `<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />`,
    title: "Customer Love",
    desc: "Our customers are at the heart of everything we do. From browsing to delivery, we craft an experience you will love.",
  },
  {
    icon: `<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />`,
    title: "Sustainability",
    desc: "We work with eco-conscious suppliers and aim to reduce our footprint. Good for you, good for the planet.",
  },
  {
    icon: `<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />`,
    title: "Innovation",
    desc: "We constantly seek out the latest, most innovative products to bring fresh ideas and excitement to your life.",
  },
];

const stats = [
  { value: "10,000+", label: "Happy Customers" },
  { value: "24+", label: "Curated Products" },
  { value: "4.7★", label: "Average Rating" },
  { value: "99%", label: "Satisfaction Rate" },
];

const team = [
  {
    name: "Amara Ceesay",
    role: "Founder & CEO",
    initials: "AC",
    color: "bg-indigo-100 text-indigo-700",
  },
  {
    name: "Fatou Jallow",
    role: "Head of Design",
    initials: "FJ",
    color: "bg-purple-100 text-purple-700",
  },
  {
    name: "Lamin Touray",
    role: "Lead Developer",
    initials: "LT",
    color: "bg-emerald-100 text-emerald-700",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section
        className="bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-900 text-white py-24"
        aria-labelledby="about-hero-heading"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block mb-4 text-xs font-bold uppercase tracking-widest text-indigo-300 bg-indigo-800/50 px-3 py-1.5 rounded-full">
            Our Story
          </span>
          <h1
            id="about-hero-heading"
            className="text-4xl sm:text-5xl font-black leading-tight mb-6"
          >
            We Believe Great Products
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
              Make Life Better
            </span>
          </h1>
          <p className="text-indigo-200 text-lg leading-relaxed max-w-2xl mx-auto">
            NOVA was born from a simple idea: premium, thoughtfully curated
            products should be accessible to everyone. We are a small team
            passionate about quality, design, and the joy of discovering
            something truly great.
          </p>
        </div>
      </section>

      {/* Story section */}
      <section className="py-20 bg-white" aria-labelledby="our-story-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2
                id="our-story-heading"
                className="text-3xl font-black text-gray-900 mb-6"
              >
                How It All Started
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  NOVA Store was founded in 2024 by a group of friends who
                  shared a frustration: finding truly high-quality products
                  online felt exhausting. Too many choices, too little curation,
                  and no guarantee of quality.
                </p>
                <p>
                  We set out to change that. NOVA is a hand-curated marketplace
                  where every single product is tested, evaluated, and approved
                  by our team before it makes it to our shelves. We source from
                  manufacturers who share our values: quality materials, fair
                  practices, and thoughtful design.
                </p>
                <p>
                  Today, thousands of happy customers trust NOVA to deliver
                  premium electronics, fashion, home goods, and beauty products
                  that genuinely improve their everyday lives. And we are just
                  getting started.
                </p>
              </div>
            </div>

            {/* Visual */}
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  bg: "bg-indigo-600",
                  text: "text-white",
                  quote: '"Quality is never an accident"',
                  attr: "— NOVA Motto",
                },
                {
                  bg: "bg-amber-400",
                  text: "text-gray-900",
                  quote: '"Design is how it works"',
                  attr: "— Steve Jobs",
                },
                {
                  bg: "bg-gray-900",
                  text: "text-white",
                  quote: '"Simplicity is the ultimate sophistication"',
                  attr: "— Leonardo da Vinci",
                },
                {
                  bg: "bg-indigo-100",
                  text: "text-indigo-900",
                  quote: '"Make it simple, make it memorable"',
                  attr: "— Leo Burnett",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className={`${card.bg} ${card.text} rounded-2xl p-5 flex flex-col justify-between aspect-square`}
                >
                  <p className="text-sm font-semibold leading-snug">
                    {card.quote}
                  </p>
                  <p className="text-xs opacity-70 mt-2">{card.attr}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50" aria-labelledby="stats-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="stats-heading" className="sr-only">
            Our Numbers
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-2xl p-6 text-center border border-gray-100"
              >
                <p className="text-3xl font-black text-indigo-600 mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white" aria-labelledby="values-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              id="values-heading"
              className="text-3xl font-black text-gray-900 mb-3"
            >
              What We Stand For
            </h2>
            <p className="text-gray-500 max-w-md mx-auto">
              Our values guide every decision we make — from product selection
              to customer service.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="p-6 bg-gray-50 rounded-2xl flex flex-col gap-4 hover:bg-indigo-50 hover:border-indigo-100 border border-transparent transition-colors"
              >
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                    dangerouslySetInnerHTML={{ __html: v.icon }}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gray-50" aria-labelledby="team-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            id="team-heading"
            className="text-3xl font-black text-gray-900 mb-3"
          >
            Meet the Team
          </h2>
          <p className="text-gray-500 mb-12 max-w-md mx-auto">
            The passionate people behind NOVA who work every day to bring you
            the best products and experience.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="flex flex-col items-center gap-3"
              >
                <div
                  className={`w-24 h-24 ${member.color} rounded-full flex items-center justify-center text-2xl font-black`}
                  aria-hidden="true"
                >
                  {member.initials}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 bg-indigo-600 text-white"
        aria-labelledby="cta-heading"
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="cta-heading" className="text-3xl font-black mb-4">
            Ready to Discover NOVA?
          </h2>
          <p className="text-indigo-200 mb-8">
            Explore our full collection of premium products, curated just for
            you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="px-8 py-3.5 bg-white text-indigo-700 font-bold rounded-full hover:bg-indigo-50 transition-colors text-sm"
            >
              Shop Now
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-colors text-sm"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
