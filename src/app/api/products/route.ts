import { NextResponse } from "next/server";
import { getCatalog } from "@/lib/data/repository";
import { searchProducts } from "@/lib/search";

/**
 * Product catalog endpoint consumed by TanStack Query on the client.
 * Reads from the same data layer the Server Components use, so mock mode
 * and the real DB are transparent to the caller.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const collection = searchParams.get("collection");
  const q = searchParams.get("q")?.trim();

  let products = await getCatalog();
  if (category) products = products.filter((p) => p.category === category);
  if (collection)
    products = products.filter(
      (p) => p.collection.toLowerCase() === collection.toLowerCase(),
    );
  if (q) products = searchProducts(products, q);

  return NextResponse.json({ products });
}
