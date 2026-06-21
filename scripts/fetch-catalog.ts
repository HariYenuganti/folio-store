/**
 * Catalog seed script.
 *
 * Pulls real fashion products from the public DummyJSON API, normalises them
 * into the app's `Product` shape, and writes the result to
 * `src/lib/data/catalog.json`. The app imports that JSON, so once seeded it
 * runs fully offline — the network is only needed to (re)generate the catalog.
 *
 *   npm run catalog        # re-fetch and rebuild catalog.json
 *
 * DummyJSON gives us real titles, descriptions, prices, discounts, ratings,
 * reviews, stock and (importantly) reliable product photography.
 */
import { writeFile } from "node:fs/promises";
import { join } from "node:path";

const API = "https://dummyjson.com";

/** DummyJSON fashion categories → our store categories. */
const CATEGORY_MAP: Record<string, string> = {
  "mens-shirts": "shirts",
  tops: "tops",
  "womens-dresses": "dresses",
  "mens-shoes": "shoes",
  "womens-shoes": "shoes",
  "womens-bags": "bags",
  "mens-watches": "watches",
  "womens-watches": "watches",
  sunglasses: "accessories",
  "womens-jewellery": "accessories",
};

const COLLECTIONS = ["Core", "Atelier", "Workshop"] as const;

/** Colour words we can pull straight out of a product title. */
const COLOR_WORDS: Record<string, string> = {
  black: "#1a1a1a",
  white: "#f4f4f1",
  ivory: "#efe9da",
  cream: "#ede7d9",
  beige: "#d6c7a9",
  tan: "#a07248",
  brown: "#5b3f2c",
  navy: "#1f2747",
  blue: "#3b5b8c",
  teal: "#2f6f6a",
  green: "#3f5e3f",
  olive: "#5b6244",
  red: "#9c2b2b",
  maroon: "#5e2a35",
  pink: "#d98da6",
  purple: "#6b4a86",
  yellow: "#d9b53b",
  gold: "#c7a23b",
  orange: "#c2702f",
  grey: "#8a8a8a",
  gray: "#8a8a8a",
  silver: "#c0c0c4",
};

interface DummyReview {
  rating: number;
  comment: string;
  reviewerName: string;
  date: string;
}

interface DummyProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string | null;
  images: string[];
  thumbnail: string;
  reviews?: DummyReview[];
  meta?: { createdAt?: string };
}

function kebab(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function sizesFor(category: string): string[] {
  if (["shirts", "tops", "dresses"].includes(category))
    return ["XS", "S", "M", "L", "XL"];
  if (category === "shoes") return ["S", "M", "L"];
  return ["M"]; // bags, watches, accessories — one size
}

function colorsFromTitle(title: string): { name: string; hex: string }[] {
  const words = title.toLowerCase().split(/[^a-z]+/);
  const found: { name: string; hex: string }[] = [];
  for (const w of words) {
    if (COLOR_WORDS[w] && !found.some((c) => c.name.toLowerCase() === w)) {
      found.push({ name: w[0].toUpperCase() + w.slice(1), hex: COLOR_WORDS[w] });
    }
  }
  return found.length ? found : [{ name: "As shown", hex: "#9aa0a6" }];
}

async function fetchCategory(cat: string): Promise<DummyProduct[]> {
  const res = await fetch(
    `${API}/products/category/${cat}?limit=0`
  );
  if (!res.ok) throw new Error(`Failed to fetch ${cat}: ${res.status}`);
  const data = (await res.json()) as { products: DummyProduct[] };
  return data.products;
}

async function main() {
  const cats = Object.keys(CATEGORY_MAP);
  console.log(`Fetching ${cats.length} fashion categories from DummyJSON…`);

  const batches = await Promise.all(cats.map(fetchCategory));
  const raw = batches.flat();
  console.log(`Fetched ${raw.length} products.`);

  const usedSlugs = new Set<string>();
  const uniqueSlug = (base: string) => {
    let slug = base;
    let n = 2;
    while (usedSlugs.has(slug)) slug = `${base}-${n++}`;
    usedSlugs.add(slug);
    return slug;
  };

  // Highest-rated products become "featured" on the home page.
  const ratingThreshold = [...raw]
    .map((p) => p.rating)
    .sort((a, b) => b - a)[Math.min(7, raw.length - 1)];

  const products = raw
    .sort((a, b) => a.id - b.id)
    .map((p, i) => {
      const category = CATEGORY_MAP[p.category] ?? "accessories";
      const listCents = Math.round(p.price * 100);
      const onSale = p.discountPercentage >= 8;
      const priceCents = onSale
        ? Math.round(p.price * (1 - p.discountPercentage / 100) * 100)
        : listCents;

      const reviews = (p.reviews ?? []).slice(0, 3).map((r) => ({
        rating: r.rating,
        comment: r.comment,
        reviewerName: r.reviewerName,
        date: r.date,
      }));

      return {
        id: `p_${String(i + 1).padStart(3, "0")}`,
        slug: uniqueSlug(kebab(p.title)),
        name: p.title,
        description: p.description,
        details: [
          p.brand ? `Brand: ${p.brand}` : "Designed in-house",
          `${p.tags.join(", ")}`,
          p.stock > 0 ? `${p.stock} in stock` : "Currently out of stock",
          "Ships in 2–4 business days",
        ],
        price: priceCents,
        ...(onSale ? { compareAtPrice: listCents } : {}),
        category,
        collection: COLLECTIONS[i % COLLECTIONS.length],
        sizes: sizesFor(category),
        colors: colorsFromTitle(p.title),
        images: p.images.slice(0, 4),
        tags: p.tags,
        inStock: p.stock > 0,
        rating: Math.round(p.rating * 100) / 100,
        reviewCount: reviews.length,
        reviews,
        brand: p.brand ?? null,
        stock: p.stock,
        featured: p.rating >= ratingThreshold,
        newArrival: i % 5 === 0,
      };
    });

  const out = join(process.cwd(), "src/lib/data/catalog.json");
  await writeFile(out, JSON.stringify(products, null, 2) + "\n", "utf8");
  console.log(`Wrote ${products.length} products → ${out}`);

  const counts: Record<string, number> = {};
  for (const p of products) counts[p.category] = (counts[p.category] ?? 0) + 1;
  console.log("By category:", counts);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
