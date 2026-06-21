import { NextResponse } from "next/server";
import { getAllProducts } from "@/lib/data/products";

/**
 * Product catalog endpoint consumed by TanStack Query on the client.
 * Reads from the same data layer the Server Components use, so mock mode
 * and the real DB are transparent to the caller.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const collection = searchParams.get("collection");
  const q = searchParams.get("q")?.trim().toLowerCase();

  let products = getAllProducts();
  if (category) products = products.filter((p) => p.category === category);
  if (collection)
    products = products.filter(
      (p) => p.collection.toLowerCase() === collection.toLowerCase()
    );
  if (q) {
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  return NextResponse.json({ products });
}
