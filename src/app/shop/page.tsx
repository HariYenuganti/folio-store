import { Suspense } from "react";
import { ShopClient } from "./shop-client";
import { getAllProducts } from "@/lib/data/products";

export const metadata = { title: "Shop" };

export default function ShopPage() {
  const products = getAllProducts();
  return (
    <Suspense
      fallback={<div className="container py-20 text-sm">Loading…</div>}
    >
      <ShopClient products={products} />
    </Suspense>
  );
}
