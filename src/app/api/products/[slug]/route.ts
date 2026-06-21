import { NextResponse } from "next/server";
import { getProductBySlug, getRelatedProducts } from "@/lib/data/products";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const related = getRelatedProducts(product.id);
  return NextResponse.json({ product, related });
}
