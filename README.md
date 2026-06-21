# FOLIO — Modern e-commerce in Next.js 15

A polished, production-leaning e-commerce storefront for a minimalist apparel
brand. Built as a portfolio piece to showcase a modern full-stack React
architecture: App Router, Server Components, Server Actions, Drizzle ORM,
Supabase Auth, and Stripe Checkout.

**Runs out of the box with seeded mock data.** Drop in Supabase + Stripe keys
to flip the same storefront onto a real backend with no code changes.

## Stack

| Layer        | Tech                                                                     |
| ------------ | ------------------------------------------------------------------------ |
| Framework    | **Next.js 15** App Router, React 19, Server Components                   |
| Language     | TypeScript 5, strict mode                                                |
| Styling      | Tailwind CSS 3 + CSS variables, shadcn-style primitives, Radix UI        |
| Database     | **Drizzle ORM** over Postgres (Supabase or any Postgres)                 |
| Auth         | **Supabase Auth** (email/password) via `@supabase/ssr`                   |
| Payments     | **Stripe Checkout** + webhook handler                                    |
| Data fetching| **TanStack Query (React Query) v5** — cached client fetching + SSR hydration |
| State        | Zustand (cart, persisted to localStorage)                                |
| Validation   | Zod                                                                      |
| UX           | next-themes (light/dark), Sonner (toasts), Lucide icons, Framer Motion   |

## What's inside

- **Real product catalog** — Seeded from the public DummyJSON API by a normalisation script (`npm run catalog`) and baked to JSON so it runs offline. Real titles, descriptions, prices, discounts, ratings, reviews, stock, and photography across 7 categories
- **Editorial home** — Hero, featured products, collections lookbook, manifesto
- **Shop / PLP** — Category + collection + size filters, sort, URL-synced state
- **PDP** — Image gallery, color swatches, size picker, star ratings, real customer reviews, stock status, accordion details, related products
- **Cart** — Slide-out drawer + dedicated cart page, persisted to localStorage
- **Checkout** — Stripe Checkout session (with mock fallback for demos)
- **Auth** — Supabase email/password sign-in & sign-up (with demo fallback)
- **Account** — Profile, order history
- **Theming** — Light + dark, system-aware
- **Accessibility** — Keyboard navigation, focus rings, labelled controls
- **Responsive** — Mobile-first across every page

## Quick start

```bash
git clone <this-repo> folio-store
cd folio-store
npm install --legacy-peer-deps
npm run dev
```

Open <http://localhost:3000>. You get the full storefront with seeded products,
a working cart and a mock checkout — no external services required.

## Going full-stack (Supabase + Stripe)

```bash
cp .env.example .env.local
```

Fill in:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
DATABASE_URL=postgres://...        # Supabase connection string
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...    # for /api/webhooks/stripe
```

Then push the schema and seed the catalog:

```bash
npm run db:push
npm run db:seed
```

Restart `npm run dev`. The app now uses real Postgres + Supabase Auth, and
checkout redirects to Stripe.

> The wiring is gated entirely on env-var presence — no code changes needed
> to switch between modes. See `src/lib/stripe.ts`, `src/lib/supabase/*`,
> and `src/lib/db/index.ts` for the feature flags.

## Project layout

```
src/
├── app/                      # App Router routes
│   ├── (home)/               # Landing page
│   ├── shop/                 # PLP + PDP
│   ├── cart/                 # Cart page
│   ├── checkout/             # Checkout + success
│   ├── account/              # Profile + orders
│   ├── sign-in / sign-up/    # Supabase auth
│   └── api/
│       ├── checkout/         # Creates Stripe Checkout sessions
│       └── webhooks/stripe/  # Stripe webhook handler
├── components/
│   ├── ui/                   # Radix-powered shadcn primitives
│   ├── header.tsx footer.tsx cart-drawer.tsx
│   └── product-card.tsx product-grid.tsx
├── lib/
│   ├── db/                   # Drizzle schema + client
│   ├── data/products.ts      # Seeded catalog (used in mock mode)
│   ├── supabase/             # Server + client Supabase wrappers
│   ├── stripe.ts             # Stripe client + feature flag
│   └── utils.ts              # cn(), formatPrice(), slugify()
├── store/cart.ts             # Zustand cart store
└── types/                    # Shared domain types
```

## Architecture notes

- **Two data sources, one shape.** `src/lib/data/products.ts` exports the
  same `Product` type that Drizzle infers from the schema, so consumers
  don't care whether the catalog comes from in-memory seed data or
  Supabase.
- **Stripe in mock mode.** Without `STRIPE_SECRET_KEY`, `/api/checkout`
  returns a mock order ID and the UI walks through the success page. With
  it set, the same route creates a real Checkout session.
- **Cart persistence.** Zustand + `persist` middleware writes to
  `localStorage`. Cart survives reloads, restores into the slide-out
  drawer, and is cleared on a successful checkout.
- **Routing.** Shop filters live in the URL (`?category=`, `?collection=`),
  so links and back/forward navigation work as expected.
- **Data fetching.** The catalog is exposed at `/api/products` and consumed
  on the client with TanStack Query. Server Components pass their rendered
  list as `initialData`, so the first paint is instant (no spinner) while
  React Query owns caching, background refetching, and the devtools panel.
  See `src/components/query-provider.tsx`, `src/hooks/use-products.ts`,
  and `src/lib/api.ts`.

## Scripts

```bash
npm run dev         # Next.js dev server
npm run build       # Production build
npm run start       # Production server
npm run typecheck   # tsc --noEmit
npm run lint        # next lint
npm run db:push     # Drizzle: push schema to Postgres
npm run db:seed     # Seed catalog into the DB
```

## Credits

- Photography placeholders from [Unsplash](https://unsplash.com)
- UI primitives modeled after [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)

## License

MIT
