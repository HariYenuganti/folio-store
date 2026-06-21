import type { Product } from "@/types";

/** Client-side fetchers used by TanStack Query hooks. */

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Request failed (${res.status}): ${url}`);
  }
  return res.json() as Promise<T>;
}

export interface ProductsFilter {
  category?: string;
  collection?: string;
}

export function fetchProducts(filter: ProductsFilter = {}) {
  const params = new URLSearchParams();
  if (filter.category && filter.category !== "all")
    params.set("category", filter.category);
  if (filter.collection && filter.collection !== "all")
    params.set("collection", filter.collection);
  const qs = params.toString();
  return getJson<{ products: Product[] }>(
    `/api/products${qs ? `?${qs}` : ""}`
  ).then((d) => d.products);
}

export function fetchProduct(slug: string) {
  return getJson<{ product: Product; related: Product[] }>(
    `/api/products/${slug}`
  );
}

export function searchProducts(q: string) {
  return getJson<{ products: Product[] }>(
    `/api/products?q=${encodeURIComponent(q)}`
  ).then((d) => d.products);
}
