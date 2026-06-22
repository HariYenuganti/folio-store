import { NextResponse } from "next/server";
import { getProductBySlug, getRelatedProducts } from "@/lib/data/products";
import { getCatalog } from "@/lib/data/repository";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const catalog = await getCatalog();
  const product = getProductBySlug(slug, catalog);
  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const related = getRelatedProducts(product.id, 4, catalog);
  return NextResponse.json({ product, related });
}
