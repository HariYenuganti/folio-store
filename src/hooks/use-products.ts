"use client";

import { useQuery } from "@tanstack/react-query";
import {
  fetchProduct,
  fetchProducts,
  searchProducts,
  type ProductsFilter,
} from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";
import type { Product } from "@/types";

/**
 * Product list, fetched via TanStack Query.
 * Pass `initialData` from a Server Component to hydrate without a loading flash.
 */
export function useProducts(
  filter: ProductsFilter = {},
  initialData?: Product[],
) {
  return useQuery({
    queryKey: queryKeys.products(filter),
    queryFn: () => fetchProducts(filter),
    initialData,
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: queryKeys.product(slug),
    queryFn: () => fetchProduct(slug),
    enabled: Boolean(slug),
  });
}

/** Product search. Disabled until the query is at least 2 characters. */
export function useSearch(query: string) {
  const q = query.trim();
  return useQuery({
    queryKey: queryKeys.search(q),
    queryFn: () => searchProducts(q),
    enabled: q.length >= 2,
    staleTime: 30_000,
  });
}
