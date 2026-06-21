import type { Product } from "@/types";

/**
 * Seed catalog. Used as the default data source when no Postgres connection
 * is configured. The shape matches the Drizzle schema 1:1 so swapping to the
 * real DB requires no consumer-side changes.
 */
export const PRODUCTS: Product[] = [
  {
    id: "p_001",
    slug: "noir-overshirt",
    name: "Noir Overshirt",
    description:
      "A heavyweight cotton overshirt cut from 12oz Japanese twill. Boxy, easy, made to wear open or buttoned over a tee.",
    details: [
      "100% Japanese cotton twill, 12oz",
      "Garment-dyed for a soft, lived-in hand",
      "Two chest pockets with corozo buttons",
      "Made in Portugal",
    ],
    price: 18500,
    compareAtPrice: 22000,
    category: "outerwear",
    collection: "Core",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "Sand", hex: "#d6c7a9" },
    ],
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1200&q=80",
    ],
    tags: ["new", "essentials"],
    inStock: true,
    featured: true,
    newArrival: true,
  },
  {
    id: "p_002",
    slug: "loom-merino-crewneck",
    name: "Loom Merino Crewneck",
    description:
      "A fine-gauge merino wool sweater knitted on vintage looms in northern Italy. Lightweight, breathable, and effortless to layer.",
    details: [
      "100% extrafine merino wool",
      "Fully fashioned, knit-to-shape",
      "Ribbed cuffs and hem",
      "Made in Italy",
    ],
    price: 14500,
    category: "knitwear",
    collection: "Core",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Bone", hex: "#ede7d9" },
      { name: "Charcoal", hex: "#383838" },
      { name: "Ink", hex: "#1a2238" },
    ],
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=80",
    ],
    tags: ["essentials"],
    inStock: true,
    featured: true,
  },
  {
    id: "p_003",
    slug: "field-trouser",
    name: "Field Trouser",
    description:
      "Relaxed-leg cotton trousers built around a wide waistband and pleated front. Designed for everyday wear, hold a press, and only get better with time.",
    details: [
      "100% organic cotton chino, 9oz",
      "Single pleat, slanted side pockets",
      "Button-tab back pockets",
      "Unhemmed — finish to your length",
    ],
    price: 12500,
    category: "bottoms",
    collection: "Core",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Olive", hex: "#5b6244" },
      { name: "Stone", hex: "#a89e85" },
      { name: "Black", hex: "#1a1a1a" },
    ],
    images: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1200&q=80",
    ],
    tags: ["essentials"],
    inStock: true,
  },
  {
    id: "p_004",
    slug: "linear-tee",
    name: "Linear Tee",
    description:
      "The Linear Tee is a refined take on the everyday white shirt — knit from long-staple Supima cotton with a clean neckline and a soft, structured drape.",
    details: [
      "100% Supima cotton, 220gsm",
      "Tubular knit construction",
      "Rib-knit collar",
      "Made in Los Angeles",
    ],
    price: 5500,
    category: "tops",
    collection: "Core",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "White", hex: "#f4f4f1" },
      { name: "Black", hex: "#1a1a1a" },
      { name: "Heather", hex: "#9aa0a6" },
    ],
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=80",
    ],
    tags: ["essentials"],
    inStock: true,
    featured: true,
  },
  {
    id: "p_005",
    slug: "atlas-wool-coat",
    name: "Atlas Wool Coat",
    description:
      "A double-faced wool coat cut to a relaxed silhouette. Inspired by mid-century cinema costuming — wear with everything.",
    details: [
      "85% virgin wool, 15% cashmere",
      "Double-faced — no lining required",
      "Horn buttons, set-in sleeves",
      "Made in Italy",
    ],
    price: 49500,
    category: "outerwear",
    collection: "Atelier",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Camel", hex: "#b08962" },
      { name: "Onyx", hex: "#15151a" },
    ],
    images: [
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1580657018950-c7f7d6a6d990?auto=format&fit=crop&w=1200&q=80",
    ],
    tags: ["new", "atelier"],
    inStock: true,
    featured: true,
    newArrival: true,
  },
  {
    id: "p_006",
    slug: "raw-denim-005",
    name: "Raw Denim 005",
    description:
      "13.5oz selvedge raw denim, milled in Japan and sewn in Los Angeles. A regular straight cut that wears to a personal fit over time.",
    details: [
      "13.5oz Japanese selvedge denim",
      "Unwashed, unsanforized — soak before first wear",
      "Tapered straight leg",
      "Hidden rivet construction",
    ],
    price: 21500,
    category: "bottoms",
    collection: "Workshop",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [{ name: "Indigo", hex: "#1f2747" }],
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=1200&q=80",
    ],
    tags: ["workshop"],
    inStock: true,
  },
  {
    id: "p_007",
    slug: "cable-fisherman-knit",
    name: "Cable Fisherman Knit",
    description:
      "A heavy aran-knit pullover with traditional cable panels, knit in Donegal, Ireland from undyed wool yarn.",
    details: [
      "100% undyed Donegal wool",
      "Hand-finished cable panels",
      "Saddle shoulder construction",
      "Made in Ireland",
    ],
    price: 22500,
    category: "knitwear",
    collection: "Workshop",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Natural", hex: "#e6dec4" },
      { name: "Moss", hex: "#5e6147" },
    ],
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1200&q=80",
    ],
    tags: ["workshop"],
    inStock: true,
  },
  {
    id: "p_008",
    slug: "watchman-cap",
    name: "Watchman Cap",
    description:
      "A simple roll-cuff beanie knit from milled lambswool. Cut close to the head, naturally insulating.",
    details: [
      "100% milled lambswool",
      "Roll cuff",
      "One size",
      "Made in Scotland",
    ],
    price: 4800,
    category: "accessories",
    collection: "Core",
    sizes: ["M"],
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "Oat", hex: "#d8cba5" },
      { name: "Forest", hex: "#2e3d2c" },
    ],
    images: [
      "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=1200&q=80",
    ],
    tags: ["accessories"],
    inStock: true,
  },
  {
    id: "p_009",
    slug: "oxford-camp-shirt",
    name: "Oxford Camp Shirt",
    description:
      "A short-sleeve oxford camp-collar shirt with a relaxed boxy fit. Perfect over a tee or worn alone in summer weather.",
    details: [
      "100% organic cotton oxford",
      "Camp collar, single-needle stitching",
      "Mother-of-pearl buttons",
      "Made in Portugal",
    ],
    price: 9500,
    category: "tops",
    collection: "Core",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "White", hex: "#f4f4f1" },
      { name: "Sky", hex: "#a8c2d8" },
      { name: "Sand", hex: "#d6c7a9" },
    ],
    images: [
      "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=80",
    ],
    tags: ["new", "essentials"],
    inStock: true,
    newArrival: true,
  },
  {
    id: "p_010",
    slug: "studio-tote",
    name: "Studio Tote",
    description:
      "A simple, structured tote in vegetable-tanned leather. The kind of bag you'll be carrying in ten years.",
    details: [
      "Vegetable-tanned full-grain leather",
      "Edge-painted handles",
      "Brass hardware",
      "Made in Spain",
    ],
    price: 28500,
    category: "accessories",
    collection: "Atelier",
    sizes: ["M"],
    colors: [
      { name: "Tan", hex: "#a07248" },
      { name: "Black", hex: "#1a1a1a" },
    ],
    images: [
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=1200&q=80",
    ],
    tags: ["atelier"],
    inStock: true,
  },
  {
    id: "p_011",
    slug: "panel-cardigan",
    name: "Panel Cardigan",
    description:
      "A relaxed-fit cardigan in undyed lambswool with corozo buttons. Designed to layer effortlessly under a coat.",
    details: [
      "100% lambswool",
      "Knit on hand-controlled machines",
      "Corozo buttons",
      "Made in Scotland",
    ],
    price: 17500,
    category: "knitwear",
    collection: "Atelier",
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Oat", hex: "#d8cba5" },
      { name: "Slate", hex: "#5a6271" },
    ],
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1200&q=80",
    ],
    tags: ["new", "atelier"],
    inStock: true,
    newArrival: true,
  },
  {
    id: "p_012",
    slug: "wide-pleat-trouser",
    name: "Wide Pleat Trouser",
    description:
      "A wide-leg pleated trouser in Italian wool gabardine. Sharply tailored above, generously cut below.",
    details: [
      "100% Italian wool gabardine",
      "Double-pleated front",
      "Side-tab adjusters",
      "Made in Italy",
    ],
    price: 23500,
    category: "bottoms",
    collection: "Atelier",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "Chocolate", hex: "#4a3025" },
    ],
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1200&q=80",
    ],
    tags: ["atelier"],
    inStock: true,
  },
];

export const COLLECTIONS = [
  {
    slug: "core",
    name: "Core",
    tagline: "Everyday foundations. Quietly considered.",
  },
  {
    slug: "atelier",
    name: "Atelier",
    tagline: "Tailored pieces, made in small runs.",
  },
  {
    slug: "workshop",
    name: "Workshop",
    tagline: "Heritage construction. Built to last.",
  },
] as const;

export const CATEGORIES = [
  { slug: "tops", name: "Tops" },
  { slug: "bottoms", name: "Bottoms" },
  { slug: "outerwear", name: "Outerwear" },
  { slug: "knitwear", name: "Knitwear" },
  { slug: "accessories", name: "Accessories" },
] as const;

// ---- Data access ----

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

export function getNewArrivals(): Product[] {
  return PRODUCTS.filter((p) => p.newArrival);
}

export function getRelatedProducts(productId: string, limit = 4): Product[] {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return [];
  return PRODUCTS.filter(
    (p) => p.id !== productId && p.category === product.category
  ).slice(0, limit);
}
