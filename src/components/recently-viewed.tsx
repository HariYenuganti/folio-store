"use client";

import { useEffect, useState } from "react";
import { useRecentlyViewed } from "@/store/recently-viewed";
import { getProductBySlug } from "@/lib/data/products";
import { ProductGrid } from "@/components/product-grid";
import type { Product } from "@/types";

/**
 * "Recently viewed" strip. Reads the persisted history after mount (to avoid a
 * hydration mismatch) and renders nothing when there's nothing to show.
 */
export function RecentlyViewed({
  excludeSlug,
  title = "Recently viewed",
}: {
  excludeSlug?: string;
  title?: string;
}) {
  const slugs = useRecentlyViewed((s) => s.slugs);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const products = slugs
    .filter((s) => s !== excludeSlug)
    .map((s) => getProductBySlug(s))
    .filter((p): p is Product => Boolean(p))
    .slice(0, 4);

  if (products.length === 0) return null;

  return (
    <section className="container py-16">
      <h2 className="mb-8 font-serif text-2xl md:text-3xl">{title}</h2>
      <ProductGrid products={products} />
    </section>
  );
}
