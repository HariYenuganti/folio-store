import { describe, it, expect } from "vitest";
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
  getCollectionPriceRange,
  getEditPicks,
} from "@/lib/data/products";

describe("data layer", () => {
  it("loads a non-empty, slug-unique catalog", () => {
    const all = getAllProducts();
    expect(all.length).toBeGreaterThan(0);
    expect(new Set(all.map((p) => p.slug)).size).toBe(all.length);
  });

  it("finds a product by slug, undefined for misses", () => {
    const p = getAllProducts()[0];
    expect(getProductBySlug(p.slug)?.id).toBe(p.id);
    expect(getProductBySlug("does-not-exist")).toBeUndefined();
  });

  it("related products exclude the product itself and respect the limit", () => {
    const p = getAllProducts()[0];
    const related = getRelatedProducts(p.id, 4);
    expect(related.length).toBeLessThanOrEqual(4);
    expect(related.every((r) => r.id !== p.id)).toBe(true);
  });

  it("edit picks are diversified across categories", () => {
    const picks = getEditPicks(7);
    expect(new Set(picks.map((p) => p.category)).size).toBeGreaterThanOrEqual(
      5,
    );
  });

  it("collection price range is non-null and ordered", () => {
    const range = getCollectionPriceRange("everyday");
    expect(range).not.toBeNull();
    expect(range!.min).toBeLessThanOrEqual(range!.max);
  });
});
