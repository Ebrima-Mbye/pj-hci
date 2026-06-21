import Link from "next/link";

const footerLinks = {
  "Quick Links": [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop All" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/cart", label: "My Cart" },
  ],
  "Customer Support": [
    { href: "#", label: "Shipping Policy" },
    { href: "#", label: "Returns & Exchanges" },
    { href: "#", label: "FAQ" },
    { href: "#", label: "Size Guide" },
    { href: "#", label: "Track My Order" },
  ],
};

const socials = [
  { name: "Facebook", href: "#" },
  { name: "Instagram", href: "#" },
  { name: "Twitter", href: "#" },
  { name: "YouTube", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400" aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xl font-black text-white mb-4"
            >
              <span className="bg-indigo-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black">
                N
              </span>
              NOVA
            </Link>
            <p className="text-sm leading-relaxed max-w-sm mb-6">
              Your destination for premium lifestyle products — curated with
              care and delivered with love. We believe great design makes
              everyday life better.
            </p>
            {/* Socials */}
            <div className="flex gap-3" aria-label="Social media links">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="text-xs border border-gray-700 hover:border-indigo-500 hover:text-white px-3 py-1.5 rounded-lg transition-colors duration-150"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-white font-semibold mb-4 text-xs uppercase tracking-widest">
                {heading}
              </h3>
              <ul className="space-y-2.5" role="list">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p>© {new Date().getFullYear()} NOVA Store. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
