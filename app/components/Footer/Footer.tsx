import Link from "next/link";

const FOOTER_LINKS = {
  shop: [
    { name: "All Collections", href: "/collection" },
    { name: "Featured Items", href: "/" },
    { name: "New Arrivals", href: "/" },
  ],
  support: [
    { name: "Customer Service", href: "/" },
    { name: "Shipping & Returns", href: "/" },
    { name: "Contact Us", href: "/" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/" },
    { name: "Terms of Service", href: "/" },
  ],
};

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-border-light pt-16 pb-8 mt-20">
      <div className="max-w-inner-width mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link
              href="/"
              className="text-xl font-bold tracking-tighter uppercase mb-6 block"
            >
              MY-STORE
            </Link>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
              Elevating your lifestyle with curated collections and timeless
              designs. Quality meets aesthetics in every piece.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-primary">
              Shop
            </h4>
            <ul className="space-y-4 text-sm text-gray-500">
              {FOOTER_LINKS.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-primary">
              Support
            </h4>
            <ul className="space-y-4 text-sm text-gray-500">
              {FOOTER_LINKS.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom  */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">
            © 2026 MY-STORE. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6 text-[10px] text-gray-400 uppercase tracking-widest">
            {FOOTER_LINKS.legal.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
