import Link from "next/link";
import Logo from "./common/Logo";
import { quickLinksData } from "@/constants";
import { contactConfig } from "@/config/contact";
import FooterTop from "./layout/FooterTop";
import SocialMedia from "./common/SocialMedia";
import NewsletterForm from "./NewsletterForm";
import { ArrowRight } from "lucide-react";
import { getCategories } from "@/sanity/lib/categories";

const Footer = async () => {
  const categories = await getCategories();

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top section with contact info */}
        <FooterTop />

        {/* Main footer content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-t border-gray-200">
          {/* Brand Section */}
          <div className="space-y-5">
            <div className="mb-2">
              <Logo variant="sm" />
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {contactConfig.company.description}
            </p>
            <SocialMedia
              className="text-gray-500"
              iconClassName="border-gray-300 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50"
              tooltipClassName="bg-gray-900 text-white"
            />
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-5 text-lg">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinksData?.map((item) => (
                <li key={item?.title}>
                  <Link
                    href={item?.href}
                    className="text-gray-600 hover:text-emerald-600 text-sm font-medium transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories - Dynamic from Database */}
          <div>
            <h3 className="font-bold text-gray-900 mb-5 text-lg">Categories</h3>
            <ul className="space-y-3">
              {categories?.slice(0, 6).map((category) => (
                <li key={category._id}>
                  <Link
                    href={`/category/${category.slug}`}
                    className="text-gray-600 hover:text-emerald-600 text-sm font-medium transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-gray-900 mb-5 text-lg">Newsletter</h3>
            <p className="text-gray-600 text-sm mb-4">
              Subscribe to get exclusive offers, new arrivals, and special discounts.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-200 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-600 text-sm text-center md:text-left">
              © 2025 SadunShop. All rights reserved.
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-gray-600">Powered by</span>
              <Link
                href="https://jirify.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
              >
                Jirify
              </Link>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">Hosted by</span>
              <Link
                href="https://jws.jirify.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
              >
                JWS
              </Link>
            </div>
            <div className="flex gap-4">
              <Link href="/privacy" className="text-gray-600 hover:text-emerald-600 text-sm transition-colors">
                Privacy
              </Link>
              <span className="text-gray-400">•</span>
              <Link href="/terms" className="text-gray-600 hover:text-emerald-600 text-sm transition-colors">
                Terms
              </Link>
              <span className="text-gray-400">•</span>
              <Link href="/help" className="text-gray-600 hover:text-emerald-600 text-sm transition-colors">
                Help
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
