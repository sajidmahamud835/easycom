import { cn } from "@/lib/utils";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

interface Props {
  className?: string;
  variant?: "default" | "sm";
}

const Logo = ({ className, variant = "default" }: Props) => {
  // Small variant for footer
  if (variant === "sm") {
    return (
      <Link href={"/"}>
        <div
          className={cn(
            "flex items-center gap-1.5 group hoverEffect",
            className
          )}
        >
          {/* Cart Icon with Creative Styling (smaller) */}
          <div className="relative">
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-shop_orange rounded-full animate-pulse group-hover:bg-shop_light_green hoverEffect"></div>
            <ShoppingCart
              className="w-5 h-5 text-shop_dark_green group-hover:text-shop_light_green hoverEffect transform group-hover:scale-110"
              strokeWidth={2.5}
            />
          </div>

          {/* Text Logo (smaller) */}
          <div className="flex items-center">
            <h1 className="text-sm font-black tracking-wider uppercase font-sans">
              <span className="text-shop_dark_green group-hover:text-shop_light_green hoverEffect">
                Sadun
              </span>
              <span className="bg-gradient-to-r from-shop_light_green to-shop_orange bg-clip-text text-transparent group-hover:from-shop_dark_green group-hover:to-shop_light_green hoverEffect">
                Shop
              </span>
            </h1>

            {/* Decorative Elements (smaller) */}
            <div className="ml-0.5 flex flex-col gap-0.5">
              <div className="w-0.5 h-0.5 bg-shop_orange rounded-full group-hover:bg-shop_light_green hoverEffect"></div>
              <div className="w-0.5 h-0.5 bg-shop_light_green rounded-full group-hover:bg-shop_orange hoverEffect"></div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Default full logo
  return (
    <Link href={"/"}>
      <div
        className={cn("flex items-center gap-2 group hoverEffect", className)}
      >
        {/* Cart Icon with Creative Styling */}
        <div className="relative">
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-shop_orange rounded-full animate-pulse group-hover:bg-shop_light_green hoverEffect"></div>
          <ShoppingCart
            className="w-8 h-8 text-shop_dark_green group-hover:text-shop_light_green hoverEffect transform group-hover:scale-110"
            strokeWidth={2.5}
          />
        </div>

        {/* Text Logo */}
        <div className="flex items-center">
          <h1 className="text-2xl font-black tracking-wider uppercase font-sans">
            <span className="text-shop_dark_green group-hover:text-shop_light_green hoverEffect">
              Sadun
            </span>
            <span className="bg-gradient-to-r from-shop_light_green to-shop_orange bg-clip-text text-transparent group-hover:from-shop_dark_green group-hover:to-shop_light_green hoverEffect">
              Shop
            </span>
          </h1>

          {/* Decorative Elements */}
          <div className="ml-1 flex flex-col gap-0.5">
            <div className="w-1 h-1 bg-shop_orange rounded-full group-hover:bg-shop_light_green hoverEffect"></div>
            <div className="w-1 h-1 bg-shop_light_green rounded-full group-hover:bg-shop_orange hoverEffect"></div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
