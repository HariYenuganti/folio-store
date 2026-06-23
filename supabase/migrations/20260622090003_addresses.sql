-- Saved shipping address book.
-- addr_key is a generated, normalized key (lowercased + whitespace-trimmed
-- line1 + postal_code). The (user_id, addr_key) unique constraint dedupes the
-- same address case/whitespace-insensitively, whether it's added manually or
-- auto-saved from a checkout.

create table if not exists public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  label text,
  line1 text not null,
  line2 text,
  city text not null,
  state text,
  postal_code text not null,
  country text not null default 'United States',
  created_at timestamp not null default now(),
  addr_key text generated always as (
    lower(btrim(line1)) || '|' || lower(btrim(coalesce(postal_code, '')))
  ) stored,
  constraint addresses_user_addrkey_unique unique (user_id, addr_key)
);

alter table public.addresses enable row level security;

-- Owners can read, add and remove their own addresses.
drop policy if exists "Users read own addresses" on public.addresses;
create policy "Users read own addresses"
  on public.addresses for select
  to authenticated
  using (user_id = auth.uid());

drop policy if exists "Users insert own addresses" on public.addresses;
create policy "Users insert own addresses"
  on public.addresses for insert
  to authenticated
  with check (user_id = auth.uid());

drop policy if exists "Users delete own addresses" on public.addresses;
create policy "Users delete own addresses"
  on public.addresses for delete
  to authenticated
  using (user_id = auth.uid());
