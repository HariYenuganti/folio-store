import type { Product } from "@/types";
import catalog from "./catalog.json";

/**
 * Product catalog.
 *
 * The data is seeded from the public DummyJSON API by `scripts/fetch-catalog.ts`
 * and baked into `catalog.json`, so the app runs fully offline. Run
 * `npm run catalog` to refresh it. The shape matches the Drizzle schema, so
 * swapping in the real DB requires no consumer-side changes.
 */
export const PRODUCTS: Product[] = catalog as unknown as Product[];

// Collections are price tiers (assigned by the seed script): Core = everyday,
// Atelier = elevated, Workshop = statement / investment pieces.
export const COLLECTIONS = [
  {
    slug: "core",
    name: "Core",
    tagline: "Everyday foundations — our most accessible pieces.",
  },
  {
    slug: "atelier",
    name: "Atelier",
    tagline: "Elevated essentials at a considered price.",
  },
  {
    slug: "workshop",
    name: "Workshop",
    tagline: "Statement design and investment buys.",
  },
] as const;

export const CATEGORIES = [
  { slug: "shirts", name: "Shirts" },
  { slug: "tops", name: "Tops" },
  { slug: "dresses", name: "Dresses" },
  { slug: "shoes", name: "Shoes" },
  { slug: "bags", name: "Bags" },
  { slug: "watches", name: "Watches" },
  { slug: "accessories", name: "Accessories" },
] as const;

// ---- Data access ----

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

/**
 * A diversified "edit" — the highest-rated product from each category first,
 * then the next-best overall to fill the row. Keeps the home feature grid from
 * being dominated by a single category (e.g. all sneakers).
 */
export function getEditPicks(limit = 8): Product[] {
  const byRating = [...PRODUCTS].sort(
    (a, b) => (b.rating ?? 0) - (a.rating ?? 0)
  );
  const picks: Product[] = [];
  const chosen = new Set<string>();

  // One per category, best-rated.
  const seenCategory = new Set<string>();
  for (const p of byRating) {
    if (!seenCategory.has(p.category)) {
      seenCategory.add(p.category);
      picks.push(p);
      chosen.add(p.id);
    }
  }
  // Fill remaining slots with the next best overall.
  for (const p of byRating) {
    if (picks.length >= limit) break;
    if (!chosen.has(p.id)) {
      picks.push(p);
      chosen.add(p.id);
    }
  }
  return picks.slice(0, limit);
}

/** Representative cover image for a collection (its highest-rated product). */
export function getCollectionCoverImage(slug: string): string | null {
  const items = PRODUCTS.filter(
    (p) => p.collection.toLowerCase() === slug.toLowerCase()
  );
  if (!items.length) return null;
  const top = [...items].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))[0];
  return top.images[0] ?? null;
}

export function getNewArrivals(): Product[] {
  return PRODUCTS.filter((p) => p.newArrival);
}

/** Min/max price (in cents) of the products in a collection — used to label
 *  the price tiers in the UI. Returns null for an empty collection. */
export function getCollectionPriceRange(
  slug: string
): { min: number; max: number } | null {
  const items = PRODUCTS.filter(
    (p) => p.collection.toLowerCase() === slug.toLowerCase()
  );
  if (!items.length) return null;
  const prices = items.map((p) => p.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

export function getRelatedProducts(productId: string, limit = 4): Product[] {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return [];
  const sameCategory = PRODUCTS.filter(
    (p) => p.id !== productId && p.category === product.category
  );
  // Fall back to other products if a category is too small to fill the row.
  const fill = PRODUCTS.filter(
    (p) => p.id !== productId && p.category !== product.category
  );
  return [...sameCategory, ...fill].slice(0, limit);
}
