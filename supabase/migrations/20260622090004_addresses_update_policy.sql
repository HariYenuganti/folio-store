-- Allow owners to edit their own saved addresses.
-- (The initial addresses migration only granted select/insert/delete.)
-- UPDATE needs both USING (which rows are visible to update) and WITH CHECK
-- (the new row must still belong to the user).

drop policy if exists "Users update own addresses" on public.addresses;
create policy "Users update own addresses"
  on public.addresses for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());
