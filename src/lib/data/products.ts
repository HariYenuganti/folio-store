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

export const COLLECTIONS = [
  {
    slug: "core",
    name: "Core",
    tagline: "Everyday foundations. Quietly considered.",
  },
  {
    slug: "atelier",
    name: "Atelier",
    tagline: "Elevated pieces, made in small runs.",
  },
  {
    slug: "workshop",
    name: "Workshop",
    tagline: "Statement design. Built to last.",
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

export function getNewArrivals(): Product[] {
  return PRODUCTS.filter((p) => p.newArrival);
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
