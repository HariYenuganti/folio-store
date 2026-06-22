"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useWishlist } from "@/store/wishlist";
import { getProductBySlug } from "@/lib/data/products";
import { ProductGrid } from "@/components/product-grid";
import { ProductGridSkeleton } from "@/components/product-grid-skeleton";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types";

export function WishlistClient() {
  const slugs = useWishlist((s) => s.slugs);
  const clear = useWishlist((s) => s.clear);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <ProductGridSkeleton count={4} />;

  const products = slugs
    .map((s) => getProductBySlug(s))
    .filter((p): p is Product => Boolean(p));

  if (products.length === 0) {
    return (
      <div className="border border-border p-12 text-center">
        <p className="font-serif text-2xl">Nothing saved yet</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Tap the heart on any product to save it here.
        </p>
        <Button asChild className="mt-6 rounded-none">
          <Link href="/shop">Browse the shop</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {products.length} {products.length === 1 ? "piece" : "pieces"}
        </p>
        <button
          onClick={clear}
          className="text-xs uppercase tracking-widest text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          Clear all
        </button>
      </div>
      <ProductGrid products={products} />
    </div>
  );
}
