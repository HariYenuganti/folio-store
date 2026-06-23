import { notFound } from "next/navigation";
import Link from "next/link";
import { isSupabaseConfigured, isAdminEmail } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getCatalog } from "@/lib/data/repository";
import { formatPrice } from "@/lib/utils";

export const metadata = { title: "Admin" };
export const dynamic = "force-dynamic";

type AdminOrder = {
  id: string;
  created_at: string;
  email: string | null;
  status: string;
  total: number;
  items: unknown[];
};

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border p-6">
      <p className="text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 font-serif text-3xl tabular-nums">{value}</p>
    </div>
  );
}

export default async function AdminPage() {
  // Gate: signed in AND on the server-side admin allowlist. 404 (not redirect)
  // so the route's existence isn't revealed to non-admins.
  if (!isSupabaseConfigured) notFound();
  const supabase = await createClient();
  const userRes = supabase ? await supabase.auth.getUser() : null;
  const user = userRes?.data.user ?? null;
  if (!isAdminEmail(user?.email)) notFound();

  const products = await getCatalog();

  // All orders require the service role (RLS otherwise scopes to the viewer).
  const db = createAdminClient();
  let orders: AdminOrder[] = [];
  let ordersUnavailable = !db;
  if (db) {
    const { data, error } = await db
      .from("orders")
      .select("id, created_at, email, status, total, items")
      .order("created_at", { ascending: false });
    if (error) ordersUnavailable = true;
    else orders = (data as AdminOrder[]) ?? [];
  }

  const revenue = orders
    .filter((o) => o.status === "paid")
    .reduce((sum, o) => sum + (o.total ?? 0), 0);
  const lowStock = products.filter(
    (p) => typeof p.stock === "number" && p.stock <= 5,
  );

  return (
    <div className="container py-12">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Admin
        </p>
        <h1 className="mt-2 font-serif text-4xl">Dashboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Read-only overview · {user?.email}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Orders" value={String(orders.length)} />
        <Stat label="Revenue (paid)" value={formatPrice(revenue)} />
        <Stat label="Products" value={String(products.length)} />
        <Stat label="Low stock (≤5)" value={String(lowStock.length)} />
      </div>

      {ordersUnavailable && (
        <p className="mt-8 border border-border bg-secondary/40 p-4 text-sm text-muted-foreground">
          Set <code>SUPABASE_SERVICE_ROLE_KEY</code> to load all customer orders
          here.
        </p>
      )}

      <section className="mt-12">
        <h2 className="mb-4 font-serif text-2xl">Recent orders</h2>
        {orders.length === 0 ? (
          <p className="text-sm text-muted-foreground">No orders yet.</p>
        ) : (
          <div className="overflow-x-auto border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/40 text-left text-xs uppercase tracking-widest text-muted-foreground">
                  <th className="px-4 py-3 font-normal">Order</th>
                  <th className="px-4 py-3 font-normal">Date</th>
                  <th className="px-4 py-3 font-normal">Email</th>
                  <th className="px-4 py-3 font-normal">Status</th>
                  <th className="px-4 py-3 text-right font-normal">Items</th>
                  <th className="px-4 py-3 text-right font-normal">Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 25).map((o) => (
                  <tr
                    key={o.id}
                    className="border-b border-border last:border-0"
                  >
                    <td className="px-4 py-3 font-mono text-xs">
                      {o.id.slice(0, 8).toUpperCase()}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {fmtDate(o.created_at)}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {o.email ?? "—"}
                    </td>
                    <td className="px-4 py-3 capitalize">{o.status}</td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      {(o.items ?? []).length}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      {formatPrice(o.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="mt-12">
        <h2 className="mb-4 font-serif text-2xl">Low stock</h2>
        {lowStock.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Everything is well stocked.
          </p>
        ) : (
          <div className="overflow-x-auto border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/40 text-left text-xs uppercase tracking-widest text-muted-foreground">
                  <th className="px-4 py-3 font-normal">Product</th>
                  <th className="px-4 py-3 font-normal">Brand</th>
                  <th className="px-4 py-3 text-right font-normal">Stock</th>
                </tr>
              </thead>
              <tbody>
                {lowStock.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-border last:border-0"
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/shop/${p.slug}`}
                        className="hover:underline"
                      >
                        {p.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {p.brand ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      {p.stock}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
