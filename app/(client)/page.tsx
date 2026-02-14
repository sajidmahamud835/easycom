import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/sanity/lib/products";
import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";

export default async function Home() {
    const products = await getProducts();

    // Debug logging
    console.log('🔍 Homepage - Products fetched:', products?.length || 0);
    console.log('🔍 First product:', products?.[0]);

    return (
        <div className="bg-white min-h-screen">
            {/* Trending Products */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <TrendingUp className="w-6 h-6 text-[#D4AF37]" />
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Trending Now</h2>
                        </div>
                        <Link href="/shop" className="flex items-center gap-1 text-gray-600 hover:text-[#D4AF37] font-medium transition-colors group">
                            View all
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Debug Info */}
                    <div className="mb-4 p-4 bg-gray-100 rounded">
                        <p className="text-sm">Debug: Found {products?.length || 0} products</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {products?.slice(0, 10).map((product) => (
                            <ProductCard key={product?._id} product={product} />
                        ))}
                    </div>

                    {/* Show message if no products */}
                    {(!products || products.length === 0) && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No products found. Checking database...</p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Banner */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#D4AF37] to-[#C4A027] p-12 md:p-16 text-center">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
                    </div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                            Get 20% Off Your First Order
                        </h2>
                        <p className="text-black/80 mb-8 text-lg">
                            Sign up for exclusive deals and early access to new collections
                        </p>
                        <Link
                            href="/sign-up"
                            className="bg-black text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-900 transition-all inline-flex items-center gap-2 shadow-lg"
                        >
                            Sign Up Now
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
