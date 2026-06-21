import type { Category, ColorOption, Product, Size } from "@/types";

/**
 * Hand-written "hero" catalog. These keep their curated copy and imagery and
 * always appear first. The full 200+ catalog is the union of these plus a
 * deterministically generated set (see GENERATED below).
 *
 * Used as the default data source when no Postgres connection is configured.
 * The shape matches the Drizzle schema 1:1 so swapping to the real DB requires
 * no consumer-side changes.
 */
const CURATED: Product[] = [
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
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
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
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1200&q=80",
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
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1200&q=80",
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
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1200&q=80",
    ],
    tags: ["atelier"],
    inStock: true,
  },
];

/* -------------------------------------------------------------------------- */
/*  Generated catalog                                                          */
/*  Deterministic — no Math.random — so the server and client render the same  */
/*  list and the module is reproducible across builds.                         */
/* -------------------------------------------------------------------------- */

interface TypeDef {
  name: string;
  /** description tail; must NOT restate the garment noun */
  tail: string;
  /** a single construction detail line */
  detail: string;
  /** base price in cents */
  base: number;
  sizes: Size[];
}

interface MaterialDef {
  name: string;
  /** price premium in cents */
  premium: number;
  /** materials/composition detail line */
  line: string;
}

const COLLECTION_CYCLE = ["Core", "Atelier", "Workshop"] as const;
const COUNTRIES = [
  "Portugal",
  "Italy",
  "Japan",
  "Scotland",
  "Ireland",
  "Spain",
  "Los Angeles",
];
const FINISHES = [
  "Garment-dyed for a soft, lived-in hand",
  "Pre-washed for minimal shrinkage",
  "Cut and sewn in small, limited runs",
  "Designed to wear in, repair, and keep",
  "Hand-finished and quality-checked",
];

const PALETTE: ColorOption[] = [
  { name: "Black", hex: "#1a1a1a" },
  { name: "Ink", hex: "#1a2238" },
  { name: "Charcoal", hex: "#383838" },
  { name: "Slate", hex: "#5a6271" },
  { name: "Stone", hex: "#a89e85" },
  { name: "Sand", hex: "#d6c7a9" },
  { name: "Oat", hex: "#d8cba5" },
  { name: "Bone", hex: "#ede7d9" },
  { name: "Ecru", hex: "#e6dec4" },
  { name: "Olive", hex: "#5b6244" },
  { name: "Moss", hex: "#5e6147" },
  { name: "Forest", hex: "#2e3d2c" },
  { name: "Camel", hex: "#b08962" },
  { name: "Chocolate", hex: "#4a3025" },
  { name: "Rust", hex: "#9c5a3c" },
  { name: "Clay", hex: "#b06a4f" },
  { name: "Navy", hex: "#1f2747" },
  { name: "Sky", hex: "#a8c2d8" },
  { name: "Sage", hex: "#9caf88" },
  { name: "Heather", hex: "#9aa0a6" },
  { name: "Wine", hex: "#5e2a35" },
  { name: "Mustard", hex: "#c79a3b" },
];

/**
 * Deterministic, per-product image from loremflickr. Every product gets a
 * UNIQUE fashion photo — the `lock` value seeds a stable image so the URL
 * returns the same picture on every render (no hydration mismatch, no
 * flicker). The product card falls back to a neutral tile if a URL ever
 * fails, so the grid never shows a broken image.
 */
const flickr = (keywords: string, lock: number) =>
  `https://loremflickr.com/600/800/${keywords}?lock=${lock}`;

const CATEGORY_KEYWORDS: Record<Category, string> = {
  tops: "shirt",
  bottoms: "trousers",
  outerwear: "coat",
  knitwear: "sweater",
  accessories: "fashion",
};

/** Map an accessory name to a relevant image keyword. */
function accessoryKeyword(name: string): string {
  const n = name.toLowerCase();
  if (/(cap|hat|beanie)/.test(n)) return "hat";
  if (/(tote|weekender|bag)/.test(n)) return "bag";
  if (/(wallet|card)/.test(n)) return "wallet";
  if (n.includes("scarf")) return "scarf";
  if (n.includes("belt")) return "belt";
  if (n.includes("sock")) return "socks";
  if (n.includes("glove")) return "gloves";
  if (n.includes("tie")) return "necktie";
  if (n.includes("keyring")) return "keychain";
  if (n.includes("pocket square")) return "handkerchief";
  return "accessories";
}

const article = (word: string) =>
  /^[aeiou]/i.test(word.trim()) ? "An" : "A";

const roundTo = (n: number, step: number) => Math.round(n / step) * step;

// Global counters shared across category builders so ids and the deterministic
// flag/price variations stay unique and stable.
let seq = CURATED.length; // curated used p_001..p_012
const usedSlugs = new Set(CURATED.map((p) => p.slug));

function uniqueSlug(base: string): string {
  let slug = base;
  let n = 2;
  while (usedSlugs.has(slug)) slug = `${base}-${n++}`;
  usedSlugs.add(slug);
  return slug;
}

function kebab(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function pickColors(i: number): ColorOption[] {
  const count = 2 + (i % 2); // 2 or 3 colours
  const colors: ColorOption[] = [];
  for (let k = 0; k < count; k++) {
    colors.push(PALETTE[(i * 3 + k) % PALETTE.length]);
  }
  return colors;
}

/** Build a finished Product from a (material × type) pairing. */
function buildProduct(
  category: Category,
  type: TypeDef,
  material: MaterialDef
): Product {
  const i = seq++;
  const name = `${material.name} ${type.name}`;
  const collection = COLLECTION_CYCLE[i % COLLECTION_CYCLE.length];

  const price = roundTo(
    type.base + material.premium + (i % 5) * 300,
    500
  );
  const onSale = i % 7 === 0;
  const newArrival = i % 6 === 0;
  const featured = i % 9 === 0;

  const kw = CATEGORY_KEYWORDS[category];
  const images = [flickr(kw, i + 1), flickr(kw, i + 7001)];

  const tags = [collection.toLowerCase()];
  if (newArrival) tags.push("new");
  if (onSale) tags.push("sale");

  const product: Product = {
    id: `p_${String(i + 1).padStart(3, "0")}`,
    slug: uniqueSlug(kebab(name)),
    name,
    description: `${article(material.name)} ${material.name.toLowerCase()} ${type.name.toLowerCase()} — ${type.tail}`,
    details: [
      material.line,
      type.detail,
      FINISHES[i % FINISHES.length],
      `Made in ${COUNTRIES[i % COUNTRIES.length]}`,
    ],
    price,
    category,
    collection,
    sizes: type.sizes,
    colors: pickColors(i),
    images,
    tags,
    inStock: true,
  };

  if (onSale) product.compareAtPrice = roundTo(price * 1.3, 500);
  if (newArrival) product.newArrival = true;
  if (featured) product.featured = true;

  return product;
}

/** Cross product of materials × types (materials outer for type variety up
 *  front), capped at `count`. */
function buildCategory(
  category: Category,
  types: TypeDef[],
  materials: MaterialDef[],
  count: number
): Product[] {
  const out: Product[] = [];
  for (const material of materials) {
    for (const type of types) {
      if (out.length >= count) return out;
      out.push(buildProduct(category, type, material));
    }
  }
  return out;
}

const TOP_TYPES: TypeDef[] = [
  { name: "Tee", tail: "with a clean neckline and an easy, structured drape.", detail: "Tubular knit, rib-set collar", base: 5500, sizes: ["XS", "S", "M", "L", "XL", "XXL"] },
  { name: "Long-Sleeve Tee", tail: "with set-in sleeves and a relaxed, layerable body.", detail: "Ribbed cuffs, single-needle hems", base: 6500, sizes: ["XS", "S", "M", "L", "XL", "XXL"] },
  { name: "Pocket Tee", tail: "mid-weight and finished with a clean patch pocket.", detail: "Reinforced chest pocket", base: 5900, sizes: ["XS", "S", "M", "L", "XL"] },
  { name: "Henley", tail: "three-button, with a soft, broken-in feel.", detail: "Corozo button placket", base: 7500, sizes: ["S", "M", "L", "XL"] },
  { name: "Oxford Shirt", tail: "button-down, cut to a considered boxy fit.", detail: "Single-needle stitching, box pleat", base: 11500, sizes: ["XS", "S", "M", "L", "XL"] },
  { name: "Camp Shirt", tail: "short-sleeved with an open camp collar for warm weather.", detail: "Camp collar, mother-of-pearl buttons", base: 9500, sizes: ["XS", "S", "M", "L", "XL"] },
  { name: "Band-Collar Shirt", tail: "collarless, with a quiet, modern line.", detail: "Concealed placket", base: 10500, sizes: ["XS", "S", "M", "L", "XL"] },
  { name: "Polo", tail: "knit, with a refined collar and a trim placket.", detail: "Knit-rib collar and cuffs", base: 9500, sizes: ["S", "M", "L", "XL"] },
  { name: "Rugby Shirt", tail: "heavyweight, with a twill collar and rubber buttons.", detail: "Twill-faced collar", base: 11000, sizes: ["S", "M", "L", "XL"] },
  { name: "Flannel Shirt", tail: "double-brushed and built for cooler months.", detail: "Double-brushed face, chest pockets", base: 9900, sizes: ["XS", "S", "M", "L", "XL"] },
  { name: "Popover", tail: "half-placket, with a relaxed, tunic-like fall.", detail: "Two-button placket", base: 10500, sizes: ["XS", "S", "M", "L", "XL"] },
];

const TOP_MATERIALS: MaterialDef[] = [
  { name: "Supima Cotton", premium: 0, line: "100% long-staple Supima cotton" },
  { name: "Organic Cotton", premium: 500, line: "100% GOTS-certified organic cotton" },
  { name: "Slub Cotton", premium: 800, line: "Slub-textured cotton jersey" },
  { name: "Brushed Cotton", premium: 1200, line: "Brushed cotton for a softer hand" },
  { name: "Cotton-Linen", premium: 1500, line: "Cotton-linen blend, breathable weave" },
];

const BOTTOM_TYPES: TypeDef[] = [
  { name: "Chino", tail: "tapered, with a clean and versatile line.", detail: "Slant side pockets, button-tab back", base: 12500, sizes: ["XS", "S", "M", "L", "XL"] },
  { name: "Pleated Trouser", tail: "single-pleated to hold a sharp press.", detail: "Curtained waistband, French-bearer fly", base: 18500, sizes: ["XS", "S", "M", "L", "XL"] },
  { name: "Wide Trouser", tail: "sharply cut above and generously wide below.", detail: "Side-tab adjusters", base: 21500, sizes: ["XS", "S", "M", "L", "XL"] },
  { name: "Tapered Trouser", tail: "tailored at a comfortable mid-rise.", detail: "Hook-and-bar closure", base: 17500, sizes: ["XS", "S", "M", "L", "XL"] },
  { name: "Cargo Pant", tail: "relaxed, with clean low-profile pockets.", detail: "Bellowed leg pockets", base: 16500, sizes: ["XS", "S", "M", "L", "XL"] },
  { name: "Drawstring Pant", tail: "easy, with an elastic-back drawcord waist.", detail: "Elastic back, draw cord", base: 13500, sizes: ["XS", "S", "M", "L", "XL"] },
  { name: "Five-Pocket Pant", tail: "with a straight, everyday leg.", detail: "Riveted pockets", base: 14500, sizes: ["XS", "S", "M", "L", "XL"] },
  { name: "Cropped Trouser", tail: "breaking just above the ankle.", detail: "Clean cropped hem", base: 16500, sizes: ["XS", "S", "M", "L", "XL"] },
  { name: "Carpenter Pant", tail: "roomy and square through the leg, with utility pockets.", detail: "Hammer loop, tool pockets", base: 15500, sizes: ["XS", "S", "M", "L", "XL"] },
  { name: "Pleated Short", tail: "tailored to a clean mid-length.", detail: "Single pleat, slant pockets", base: 9500, sizes: ["XS", "S", "M", "L", "XL"] },
];

const BOTTOM_MATERIALS: MaterialDef[] = [
  { name: "Organic Cotton Twill", premium: 0, line: "9oz organic cotton twill" },
  { name: "Japanese Twill", premium: 1500, line: "Heavyweight Japanese cotton twill" },
  { name: "Wool Gabardine", premium: 4000, line: "Italian wool gabardine" },
  { name: "Corduroy", premium: 2000, line: "8-wale cotton corduroy" },
  { name: "Garment-Dyed Cotton", premium: 1200, line: "Garment-dyed cotton, lived-in hand" },
];

const OUTERWEAR_TYPES: TypeDef[] = [
  { name: "Overshirt", tail: "boxy, to wear open or buttoned over a tee.", detail: "Two chest pockets, corozo buttons", base: 18500, sizes: ["XS", "S", "M", "L", "XL"] },
  { name: "Chore Jacket", tail: "French-inspired, with a utilitarian three-pocket cut.", detail: "Three patch pockets", base: 19500, sizes: ["XS", "S", "M", "L", "XL"] },
  { name: "Field Jacket", tail: "four-pocket, with a relaxed military line.", detail: "Snap storm flap", base: 24500, sizes: ["XS", "S", "M", "L", "XL"] },
  { name: "Bomber", tail: "clean, with a trim collar and ribbed hem.", detail: "Two-way zip, ribbed trims", base: 22500, sizes: ["S", "M", "L", "XL"] },
  { name: "Wool Coat", tail: "double-faced and cut to a relaxed silhouette.", detail: "Horn buttons, set-in sleeves", base: 49500, sizes: ["S", "M", "L", "XL"] },
  { name: "Topcoat", tail: "tailored to a timeless, understated line.", detail: "Notch lapel, back vent", base: 52500, sizes: ["S", "M", "L", "XL"] },
  { name: "Trench", tail: "in a modern, lighter build with a belted waist.", detail: "Storm flap, belted waist", base: 38500, sizes: ["S", "M", "L", "XL"] },
  { name: "Peacoat", tail: "with a heritage double-breasted front.", detail: "Anchor-stamped buttons", base: 36500, sizes: ["S", "M", "L", "XL"] },
  { name: "Parka", tail: "insulated and built for real winter weather.", detail: "Drawcord hood, snap placket", base: 42500, sizes: ["S", "M", "L", "XL"] },
  { name: "Quilted Jacket", tail: "lightweight and made to layer.", detail: "Diamond quilting, snap front", base: 23500, sizes: ["S", "M", "L", "XL"] },
  { name: "Harrington", tail: "classic, with a tartan-lined body and stand collar.", detail: "Stand collar, twin-button cuffs", base: 21500, sizes: ["S", "M", "L", "XL"] },
];

const OUTERWEAR_MATERIALS: MaterialDef[] = [
  { name: "Waxed Cotton", premium: 2000, line: "British waxed cotton shell" },
  { name: "Virgin Wool", premium: 4000, line: "Italian virgin wool" },
  { name: "Wool-Cashmere", premium: 8000, line: "Wool-cashmere blend" },
  { name: "Cotton Ripstop", premium: 1000, line: "Cotton ripstop shell" },
  { name: "Boiled Wool", premium: 3000, line: "Boiled wool, water-resistant" },
];

const KNIT_TYPES: TypeDef[] = [
  { name: "Crewneck", tail: "fine-gauge and light enough to layer.", detail: "Fully fashioned, ribbed trims", base: 14500, sizes: ["S", "M", "L", "XL"] },
  { name: "V-Neck", tail: "clean, with a tailored knit body.", detail: "Rib-knit V placket", base: 13500, sizes: ["S", "M", "L", "XL"] },
  { name: "Cardigan", tail: "relaxed, with corozo buttons.", detail: "Hand-controlled knit", base: 17500, sizes: ["S", "M", "L"] },
  { name: "Turtleneck", tail: "with a soft, insulating doubled roll neck.", detail: "Doubled roll neck", base: 16500, sizes: ["S", "M", "L", "XL"] },
  { name: "Mock Neck", tail: "slim, for clean layering.", detail: "Ribbed mock collar", base: 15500, sizes: ["S", "M", "L", "XL"] },
  { name: "Half-Zip", tail: "with a ribbed stand collar.", detail: "YKK zip, ribbed stand collar", base: 16500, sizes: ["S", "M", "L", "XL"] },
  { name: "Cable Knit", tail: "heavy, with traditional cable panels.", detail: "Hand-finished cable panels", base: 22500, sizes: ["S", "M", "L", "XL"] },
  { name: "Fisherman Knit", tail: "chunky, in undyed natural yarn.", detail: "Saddle-shoulder construction", base: 22500, sizes: ["S", "M", "L", "XL"] },
  { name: "Knit Vest", tail: "sleeveless, to layer over shirting.", detail: "Ribbed armholes and hem", base: 11500, sizes: ["S", "M", "L", "XL"] },
  { name: "Shawl Cardigan", tail: "with a generous shawl collar.", detail: "Shawl collar, leather buttons", base: 19500, sizes: ["S", "M", "L", "XL"] },
];

const KNIT_MATERIALS: MaterialDef[] = [
  { name: "Merino Wool", premium: 0, line: "Extrafine merino wool" },
  { name: "Lambswool", premium: 1000, line: "Geelong lambswool" },
  { name: "Cashmere", premium: 12000, line: "Grade-A Mongolian cashmere" },
  { name: "Donegal Wool", premium: 2000, line: "Undyed Donegal wool" },
  { name: "Cotton-Cashmere", premium: 4000, line: "Cotton-cashmere blend" },
];

// Accessories are hand-paired so material/type combinations always make sense.
const ACCESSORY_DEFS: {
  name: string;
  blurb: string;
  detail: string;
  base: number;
  sizes: Size[];
}[] = [
  { name: "Lambswool Watch Cap", blurb: "A roll-cuff watch cap knit from milled lambswool.", detail: "Roll cuff, one size", base: 4800, sizes: ["M"] },
  { name: "Merino Beanie", blurb: "A fine-gauge merino beanie cut close to the head.", detail: "Seamless knit", base: 4500, sizes: ["M"] },
  { name: "Cashmere Scarf", blurb: "A generously sized cashmere scarf with fringed ends.", detail: "Hand-finished fringe", base: 12500, sizes: ["M"] },
  { name: "Lambswool Scarf", blurb: "A ribbed lambswool scarf in heathered tones.", detail: "Ribbed knit", base: 6500, sizes: ["M"] },
  { name: "Leather Tote", blurb: "A structured tote in vegetable-tanned leather.", detail: "Edge-painted handles, brass hardware", base: 28500, sizes: ["M"] },
  { name: "Waxed Canvas Tote", blurb: "A roomy waxed-canvas tote with leather handles.", detail: "Waxed canvas, riveted base", base: 14500, sizes: ["M"] },
  { name: "Full-Grain Card Holder", blurb: "A slim card holder in full-grain leather.", detail: "Four card slots", base: 6500, sizes: ["M"] },
  { name: "Bifold Wallet", blurb: "A bifold wallet in vegetable-tanned leather.", detail: "Six card slots, note compartment", base: 9500, sizes: ["M"] },
  { name: "Bridle Leather Belt", blurb: "A bridle-leather belt with a solid brass buckle.", detail: "Solid brass buckle", base: 8500, sizes: ["S", "M", "L"] },
  { name: "Cotton Web Belt", blurb: "A cotton web belt with a brushed-metal closure.", detail: "Box-frame buckle", base: 3800, sizes: ["S", "M", "L"] },
  { name: "Wool Ball Cap", blurb: "A six-panel cap in wool melton.", detail: "Adjustable strap-back", base: 5500, sizes: ["M"] },
  { name: "Washed Cotton Cap", blurb: "A washed-cotton six-panel cap.", detail: "Curved brim, metal eyelets", base: 4500, sizes: ["M"] },
  { name: "Ribbed Crew Socks", blurb: "A three-pack of ribbed cotton crew socks.", detail: "Reinforced heel and toe", base: 2200, sizes: ["M"] },
  { name: "Merino Crew Socks", blurb: "Merino-blend crew socks for everyday warmth.", detail: "Cushioned footbed", base: 2800, sizes: ["M"] },
  { name: "Lambswool Gloves", blurb: "Knit lambswool gloves with a ribbed cuff.", detail: "Touchscreen-friendly tips", base: 5500, sizes: ["S", "M", "L"] },
  { name: "Leather Gloves", blurb: "Cashmere-lined leather gloves.", detail: "Cashmere lining", base: 11500, sizes: ["S", "M", "L"] },
  { name: "Felted Wool Bucket Hat", blurb: "A felted-wool bucket hat with a stitched brim.", detail: "Felted wool", base: 6500, sizes: ["M"] },
  { name: "Cotton Bucket Hat", blurb: "A washed-cotton bucket hat for sun cover.", detail: "Twin side eyelets", base: 4500, sizes: ["M"] },
  { name: "Suede Card Holder", blurb: "A soft suede card holder with a slim profile.", detail: "Three card slots", base: 6900, sizes: ["M"] },
  { name: "Linen Pocket Square", blurb: "A hand-rolled linen pocket square.", detail: "Hand-rolled edge", base: 3500, sizes: ["M"] },
  { name: "Silk Neck Scarf", blurb: "A printed silk neck scarf in a small format.", detail: "Hand-rolled edge", base: 8500, sizes: ["M"] },
  { name: "Waxed Canvas Weekender", blurb: "A waxed-canvas weekender with leather trim.", detail: "Leather base and handles", base: 18500, sizes: ["M"] },
  { name: "Leather Keyring", blurb: "A leather keyring with a solid brass loop.", detail: "Brass hardware", base: 2900, sizes: ["M"] },
  { name: "Knitted Wool Tie", blurb: "A knitted wool tie with a square tip.", detail: "Untipped, knitted", base: 6500, sizes: ["M"] },
];

function buildAccessories(): Product[] {
  return ACCESSORY_DEFS.map((def) => {
    const i = seq++;
    const kw = accessoryKeyword(def.name);
    const collection = COLLECTION_CYCLE[i % COLLECTION_CYCLE.length];
    const price = roundTo(def.base + (i % 4) * 200, 100);
    const onSale = i % 7 === 0;
    const newArrival = i % 6 === 0;
    const featured = i % 11 === 0;
    const tags = [collection.toLowerCase(), "accessories"];
    if (newArrival) tags.push("new");
    if (onSale) tags.push("sale");

    const product: Product = {
      id: `p_${String(i + 1).padStart(3, "0")}`,
      slug: uniqueSlug(kebab(def.name)),
      name: def.name,
      description: def.blurb,
      details: [
        def.detail,
        FINISHES[i % FINISHES.length],
        `Made in ${COUNTRIES[i % COUNTRIES.length]}`,
      ],
      price,
      category: "accessories",
      collection,
      sizes: def.sizes,
      colors: pickColors(i),
      images: [flickr(kw, i + 1), flickr(kw, i + 7001)],
      tags,
      inStock: true,
    };
    if (onSale) product.compareAtPrice = roundTo(price * 1.3, 100);
    if (newArrival) product.newArrival = true;
    if (featured) product.featured = true;
    return product;
  });
}

const GENERATED: Product[] = [
  ...buildCategory("tops", TOP_TYPES, TOP_MATERIALS, 44),
  ...buildCategory("bottoms", BOTTOM_TYPES, BOTTOM_MATERIALS, 40),
  ...buildCategory("outerwear", OUTERWEAR_TYPES, OUTERWEAR_MATERIALS, 44),
  ...buildCategory("knitwear", KNIT_TYPES, KNIT_MATERIALS, 40),
  ...buildAccessories(),
];

/** Full catalog: curated hero pieces first, then the generated set. */
export const PRODUCTS: Product[] = [...CURATED, ...GENERATED];

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
