import { Suspense } from "react";
import { ShopClient } from "./shop-client";
import { getCatalog } from "@/lib/data/repository";

export const metadata = { title: "Shop" };

export default async function ShopPage() {
  const products = await getCatalog();
  return (
    <Suspense
      fallback={<div className="container py-20 text-sm">Loading…</div>}
    >
      <ShopClient products={products} />
    </Suspense>
  );
}
