import { cache } from "react";
import { getDb, isDatabaseEnabled, schema, type ProductRow } from "@/lib/db";
import { PRODUCTS } from "./products";
import type { Category, Product, Review, Size } from "@/types";

/**
 * Catalog source of truth for server code.
 *
 * When DATABASE_URL is configured AND the products table has rows, the catalog
 * comes from Postgres. Otherwise it transparently falls back to the baked mock
 * catalog — so the storefront works with zero configuration, and "graduates" to
 * the real DB the moment one is connected and seeded.
 *
 * Pure derivations (related, featured, edit picks, …) live in `./products` and
 * take a product list, so they work identically over either source.
 */

function rowToProduct(r: ProductRow): Product {
  return {
    id: r.id,
    slug: r.slug,
    name: r.name,
    description: r.description,
    details: r.details,
    price: r.price,
    compareAtPrice: r.compareAtPrice ?? undefined,
    category: r.category as Category,
    collection: r.collection,
    sizes: r.sizes as Size[],
    colors: r.colors,
    images: r.images,
    tags: r.tags,
    inStock: r.inStock,
    featured: r.featured,
    newArrival: r.newArrival,
    rating: r.rating ?? undefined,
    reviewCount: r.reviewCount ?? undefined,
    reviews: (r.reviews as Review[]) ?? undefined,
    brand: r.brand ?? undefined,
    stock: r.stock ?? undefined,
  };
}

/**
 * The full catalog for the current request. `cache()` dedupes calls within a
 * single render pass, so multiple consumers don't each hit the DB.
 */
export const getCatalog = cache(async (): Promise<Product[]> => {
  if (!isDatabaseEnabled) return PRODUCTS;
  const db = getDb();
  if (!db) return PRODUCTS;
  try {
    const rows = await db.select().from(schema.products);
    if (rows.length === 0) return PRODUCTS; // table not seeded yet
    return rows.map(rowToProduct);
  } catch (err) {
    // Never take the storefront down because the DB is unreachable.
    console.error("Catalog DB query failed; falling back to mock:", err);
    return PRODUCTS;
  }
});
