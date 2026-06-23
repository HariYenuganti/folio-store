import Fuse from "fuse.js";
import type { Product } from "@/types";

const FUSE_OPTIONS = {
  keys: [
    { name: "name", weight: 0.5 },
    { name: "brand", weight: 0.2 },
    { name: "category", weight: 0.15 },
    { name: "collection", weight: 0.1 },
    { name: "tags", weight: 0.05 },
  ],
  threshold: 0.4, // typo tolerance — higher is fuzzier
  ignoreLocation: true,
  minMatchCharLength: 2,
};

/**
 * Typo-tolerant product search over name, brand, category, collection and tags.
 * Returns the full list unchanged for an empty query, otherwise the matches in
 * relevance order. Shared by the shop page and the /api/products endpoint so
 * the ⌘K dialog and the PLP behave identically.
 */
export function searchProducts(products: Product[], query: string): Product[] {
  const q = query.trim();
  if (!q) return products;
  return new Fuse(products, FUSE_OPTIONS).search(q).map((r) => r.item);
}
