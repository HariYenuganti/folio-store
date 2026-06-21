"use client";

import { useMemo, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { ProductGrid } from "@/components/product-grid";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { CATEGORIES, COLLECTIONS } from "@/lib/data/products";
import { cn } from "@/lib/utils";
import type { Product, Size } from "@/types";

const SIZES: Size[] = ["XS", "S", "M", "L", "XL", "XXL"];

type Sort = "featured" | "price-asc" | "price-desc" | "new";

export function ShopClient({ products }: { products: Product[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialCategory = params.get("category") ?? "all";
  const initialCollection = params.get("collection") ?? "all";

  const [category, setCategory] = useState(initialCategory);
  const [collection, setCollection] = useState(initialCollection);
  const [sizes, setSizes] = useState<Set<string>>(new Set());
  const [sort, setSort] = useState<Sort>("featured");

  const toggleSize = (s: string) => {
    setSizes((prev) => {
      const next = new Set(prev);
      next.has(s) ? next.delete(s) : next.add(s);
      return next;
    });
  };

  const filtered = useMemo(() => {
    let out = [...products];
    if (category !== "all") out = out.filter((p) => p.category === category);
    if (collection !== "all")
      out = out.filter(
        (p) => p.collection.toLowerCase() === collection.toLowerCase()
      );
    if (sizes.size > 0)
      out = out.filter((p) => p.sizes.some((s) => sizes.has(s)));
    switch (sort) {
      case "price-asc":
        out.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        out.sort((a, b) => b.price - a.price);
        break;
      case "new":
        out.sort(
          (a, b) => Number(!!b.newArrival) - Number(!!a.newArrival)
        );
        break;
      default:
        out.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    }
    return out;
  }, [products, category, collection, sizes, sort]);

  const updateUrl = (key: string, value: string) => {
    const u = new URLSearchParams(params.toString());
    if (value === "all") u.delete(key);
    else u.set(key, value);
    router.replace(`${pathname}?${u.toString()}`, { scroll: false });
  };

  const reset = () => {
    setCategory("all");
    setCollection("all");
    setSizes(new Set());
    setSort("featured");
    router.replace(pathname, { scroll: false });
  };

  return (
    <div className="container py-12">
      <div className="mb-10 max-w-2xl">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Shop
        </p>
        <h1 className="mt-2 font-serif text-4xl md:text-5xl">
          All products
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Considered pieces, organised by category and collection.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
        {/* Sidebar filters */}
        <aside className="space-y-8">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Category
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <button
                  onClick={() => {
                    setCategory("all");
                    updateUrl("category", "all");
                  }}
                  className={cn(
                    "transition-colors hover:text-foreground",
                    category === "all"
                      ? "text-foreground underline underline-offset-4"
                      : "text-muted-foreground"
                  )}
                >
                  All
                </button>
              </li>
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <button
                    onClick={() => {
                      setCategory(c.slug);
                      updateUrl("category", c.slug);
                    }}
                    className={cn(
                      "transition-colors hover:text-foreground",
                      category === c.slug
                        ? "text-foreground underline underline-offset-4"
                        : "text-muted-foreground"
                    )}
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Collection
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <button
                  onClick={() => {
                    setCollection("all");
                    updateUrl("collection", "all");
                  }}
                  className={cn(
                    "transition-colors hover:text-foreground",
                    collection === "all"
                      ? "text-foreground underline underline-offset-4"
                      : "text-muted-foreground"
                  )}
                >
                  All
                </button>
              </li>
              {COLLECTIONS.map((c) => (
                <li key={c.slug}>
                  <button
                    onClick={() => {
                      setCollection(c.slug);
                      updateUrl("collection", c.slug);
                    }}
                    className={cn(
                      "transition-colors hover:text-foreground",
                      collection === c.slug
                        ? "text-foreground underline underline-offset-4"
                        : "text-muted-foreground"
                    )}
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Size
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => toggleSize(s)}
                  className={cn(
                    "border border-border py-2 text-xs uppercase tracking-widest transition-colors",
                    sizes.has(s)
                      ? "bg-foreground text-background"
                      : "hover:bg-accent"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {(category !== "all" ||
            collection !== "all" ||
            sizes.size > 0) && (
            <Button variant="outline" size="sm" onClick={reset}>
              Clear filters
            </Button>
          )}
        </aside>

        {/* Grid */}
        <div>
          <div className="mb-8 flex items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
            </p>
            <Select value={sort} onValueChange={(v) => setSort(v as Sort)}>
              <SelectTrigger className="w-[180px] rounded-none">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="new">Newest</SelectItem>
                <SelectItem value="price-asc">Price · Low to high</SelectItem>
                <SelectItem value="price-desc">Price · High to low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <ProductGrid products={filtered} />
        </div>
      </div>
    </div>
  );
}
