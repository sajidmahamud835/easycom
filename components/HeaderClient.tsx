"use client";

import Link from "next/link";
import { Search, ShoppingCart, User } from "lucide-react";
import { useState } from "react";
import { useUser, SignInButton, UserButton, ClerkLoaded } from "@clerk/nextjs";
import useCartStore from "@/store";

interface Category {
    name: string;
    href: string;
}

interface HeaderClientProps {
    categories: Category[];
}

const HeaderClient = ({ categories }: HeaderClientProps) => {
    const { user } = useUser();
    const { items } = useCartStore();
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <>
            {/* Main Header */}
            <div className="border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo - Center */}
                        <div className="flex-1 flex justify-start lg:justify-center">
                            <Link href="/" className="flex items-center">
                                <span className="text-2xl font-bold tracking-wider">
                                    Sadun<span className="text-[#D4AF37]">Shop</span>
                                </span>
                            </Link>
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-4">
                            {/* Search */}
                            <button
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className="hover:text-[#D4AF37] transition-colors"
                                aria-label="Search"
                            >
                                <Search className="w-5 h-5" />
                            </button>

                            {/* User */}
                            <ClerkLoaded>
                                {user ? (
                                    <UserButton
                                        afterSignOutUrl="/"
                                        appearance={{
                                            elements: {
                                                avatarBox: "w-8 h-8 hover:ring-2 hover:ring-[#D4AF37] transition-all"
                                            }
                                        }}
                                    />
                                ) : (
                                    <SignInButton mode="modal">
                                        <button className="hover:text-[#D4AF37] transition-colors" aria-label="Sign In">
                                            <User className="w-5 h-5" />
                                        </button>
                                    </SignInButton>
                                )}
                            </ClerkLoaded>

                            {/* Cart */}
                            <Link href="/cart" className="relative group">
                                <ShoppingCart className="w-5 h-5 group-hover:text-[#D4AF37] transition-colors" />
                                {items.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                        {items.length}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Navigation Bar */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4">
                    <nav className="flex items-center justify-center gap-6 py-3 overflow-x-auto">
                        {categories.map((category) => (
                            <Link
                                key={category.name}
                                href={category.href}
                                className="text-sm font-medium text-gray-700 hover:text-[#D4AF37] whitespace-nowrap transition-colors relative group"
                            >
                                {category.name}
                                <span className="absolute -bottom-3 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all group-hover:w-full" />
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Expandable Search Bar */}
            {isSearchOpen && (
                <div className="bg-gray-50 border-b border-gray-200 p-4">
                    <form action="/shop" className="max-w-2xl mx-auto relative">
                        <input
                            type="text"
                            name="search"
                            placeholder="Search for dresses, tops, accessories..."
                            className="w-full bg-white border border-gray-300 rounded-full px-6 py-3 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                            autoFocus
                        />
                        <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#D4AF37]">
                            <Search className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default HeaderClient;
