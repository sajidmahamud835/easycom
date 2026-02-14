import { ReactNode } from "react";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import Script from "next/script";
import { UserDataProvider } from "@/contexts/UserDataContext";

import "./globals.css";

const poppins = localFont({
  src: "./fonts/Poppins.woff2",
  variable: "--font-poppins",
  weight: "400",
  display: "swap",
  preload: true,
});
const raleway = localFont({
  src: "./fonts/Raleway.woff2",
  variable: "--font-raleway",
  weight: "100 900",
  display: "swap",
  preload: true,
});

const opensans = localFont({
  src: "./fonts/Open Sans.woff2",
  variable: "--font-open-sans",
  weight: "100 800",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://sajidmahamud.vercel.app"),
  title: {
    template: "%s | Sadunshop - Your Premium Shopping Destination",
    default: "Sadunshop - Your Premium Shopping Destination",
  },
  description:
    "Sadunshop is your premium shopping destination. Shop the best deals on electronics, fashion, home goods and more.",
  keywords: [
    "online shopping",
    "e-commerce",
    "buy online",
    "shop online",
    "electronics",
    "fashion",
    "home goods",
    "deals",
    "discounts",
    "Sadunshop",
  ],
  authors: [{ name: "Sadunshop" }],
  creator: "Sadunshop",
  publisher: "Sadunshop",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://sadunshop.com",
    siteName: "Sadunshop",
    title: "Sadunshop - Your Premium Shopping Destination",
    description:
      "Sadunshop is your premium shopping destination.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sadunshop",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sadunshop - Your Premium Shopping Destination",
    description:
      "Sadunshop is your premium shopping destination.",
    images: ["/og-image.jpg"],
    creator: "@sadunshop",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    // Add other verification codes as needed
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL || "https://sajidmahamud.vercel.app",
  },
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://sadunshop.com";

  // Organization Schema for SEO
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sadunshop",
    url: baseUrl,
    logo: `${baseUrl}/icon.png`,
    description: "Your premium shopping destination.",
    sameAs: [
      "https://twitter.com/sadunshop",
      "https://facebook.com/sadunshop",
      "https://instagram.com/sadunshop",
    ],
  };

  // WebSite Schema with SearchAction for SEO
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Sadunshop",
    url: baseUrl,
    description: "Shop the best deals on electronics, fashion, home goods and more at Sadunshop.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/shop?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          {/* Organization Schema.org JSON-LD */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
          />
          {/* WebSite Schema.org JSON-LD */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
          />
        </head>
        <body
          className={`${poppins.variable} ${raleway.variable} ${opensans.variable} antialiased`}
        >
          <UserDataProvider>{children}</UserDataProvider>


          <Toaster
            position="bottom-right"
            richColors
            closeButton
            toastOptions={{
              style: {
                background: "#ffffff",
                color: "#1f2937",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "14px",
              },
              className: "sonner-toast",
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
