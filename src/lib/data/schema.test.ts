import { describe, it, expect } from "vitest";
import { productSchema } from "@/lib/data/schema";

const valid = {
  id: "p1",
  slug: "tee",
  name: "Tee",
  description: "A tee.",
  details: [],
  price: 2000,
  category: "shirts",
  collection: "Everyday",
  sizes: ["M"],
  colors: [{ name: "Black", hex: "#000000" }],
  images: ["/x.jpg"],
  tags: [],
  inStock: true,
};

describe("productSchema", () => {
  it("accepts a valid product", () => {
    expect(productSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects an unknown category", () => {
    const r = productSchema.safeParse({ ...valid, category: "spaceships" });
    expect(r.success).toBe(false);
  });

  it("rejects a negative price", () => {
    const r = productSchema.safeParse({ ...valid, price: -5 });
    expect(r.success).toBe(false);
  });
});
