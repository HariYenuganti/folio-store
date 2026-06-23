-- Customer orders.
-- Each row is owned by a user (user_id is nullable for guest checkouts, which
-- are written by the service role from the Stripe webhook). The unique
-- stripe_session_id makes order recording idempotent across the success page
-- and the webhook.

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  email text not null,
  status text not null default 'pending',
  total integer not null,
  items jsonb not null default '[]'::jsonb,
  stripe_session_id text unique,
  shipping_address jsonb,
  created_at timestamp not null default now()
);

alter table public.orders enable row level security;

-- Owners can read and create their own orders. Webhook writes use the service
-- role key, which bypasses RLS.
drop policy if exists "Users can read own orders" on public.orders;
create policy "Users can read own orders"
  on public.orders for select
  to authenticated
  using (user_id = auth.uid());

drop policy if exists "Users can insert own orders" on public.orders;
create policy "Users can insert own orders"
  on public.orders for insert
  to authenticated
  with check (user_id = auth.uid());
