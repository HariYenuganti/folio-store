"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useWishlist } from "@/store/wishlist";
import { cn } from "@/lib/utils";

/**
 * Heart toggle. Reflects saved state only after mount to avoid a hydration
 * mismatch (the wishlist is rehydrated from localStorage on the client).
 */
export function WishlistButton({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const slugs = useWishlist((s) => s.slugs);
  const toggle = useWishlist((s) => s.toggle);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const saved = mounted && slugs.includes(slug);

  return (
    <button
      type="button"
      aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={saved}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
      className={cn(
        "flex h-8 w-8 items-center justify-center bg-background/80 backdrop-blur transition-colors hover:bg-background",
        className,
      )}
    >
      <Heart
        className={cn(
          "h-4 w-4 transition-colors",
          saved ? "fill-destructive text-destructive" : "text-foreground",
        )}
      />
    </button>
  );
}
