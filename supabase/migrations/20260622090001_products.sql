-- Products catalog.
-- Publicly readable for the storefront; rows are written by the seed scripts /
-- service role, never from the browser client.

create table if not exists public.products (
  id text primary key,
  slug text not null unique,
  name text not null,
  description text not null,
  details jsonb not null default '[]'::jsonb,
  price integer not null,
  compare_at_price integer,
  category text not null,
  collection text not null,
  sizes jsonb not null default '[]'::jsonb,
  colors jsonb not null default '[]'::jsonb,
  images jsonb not null default '[]'::jsonb,
  tags jsonb not null default '[]'::jsonb,
  in_stock boolean not null default true,
  featured boolean not null default false,
  new_arrival boolean not null default false,
  rating real,
  review_count integer,
  reviews jsonb not null default '[]'::jsonb,
  brand text,
  stock integer,
  created_at timestamp not null default now()
);

alter table public.products enable row level security;

-- Anyone (anon + authenticated) may read the catalog.
drop policy if exists "Public read products" on public.products;
create policy "Public read products"
  on public.products for select
  to public
  using (true);
