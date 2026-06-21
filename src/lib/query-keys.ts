import type { ProductsFilter } from "@/lib/api";

/** Centralised query keys for TanStack Query cache management. */
export const queryKeys = {
  products: (filter: ProductsFilter = {}) =>
    ["products", filter] as const,
  product: (slug: string) => ["product", slug] as const,
};
