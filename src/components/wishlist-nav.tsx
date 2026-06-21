"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useWishlist } from "@/store/wishlist";

export function WishlistNav() {
  const count = useWishlist((s) => s.slugs.length);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <Link
      href="/wishlist"
      aria-label={`Wishlist${mounted && count > 0 ? ` (${count})` : ""}`}
      className="relative flex h-9 w-9 items-center justify-center rounded-none transition-colors hover:bg-accent"
    >
      <Heart className="h-4 w-4" />
      {mounted && count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center bg-foreground px-1 text-[10px] font-medium text-background">
          {count}
        </span>
      )}
    </Link>
  );
}
