import Link from "next/link";
import { Phone } from "lucide-react";
import HeaderClient from "./HeaderClient";
import { getCategories } from "@/sanity/lib/categories";

const Header = async () => {
  const categories = await getCategories();

  // Map categories to navigation format
  const navCategories = categories
    .filter((cat) => cat.featured) // Only show featured categories in nav
    .map((cat) => ({
      name: cat.title,
      href: `/category/${cat.slug}`,
    }));

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Top Contact Bar */}
      <div className="bg-[#FF9800] text-white py-2 px-4 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <Phone className="w-4 h-4" />
          <span>Need help? Call us: +880 1234-567890</span>
        </div>
      </div>

      {/* Main Header - Client Component */}
      <HeaderClient categories={navCategories} />
    </header>
  );
};

export default Header;
