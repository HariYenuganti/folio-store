"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProductImage } from "@/components/product-image";
import { formatPrice } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

interface OrderItem {
  name?: string;
  slug?: string | null;
  size?: string | null;
  color?: string | null;
  image?: string | null;
  quantity?: number;
  amount?: number;
}

interface Address {
  line1?: string | null;
  line2?: string | null;
  city?: string | null;
  state?: string | null;
  postal_code?: string | null;
  country?: string | null;
}

interface OrderRow {
  id: string;
  created_at: string;
  status: string;
  total: number;
  email: string | null;
  items: OrderItem[];
  shipping_address: Address | null;
}

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

export function OrdersClient() {
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [selected, setSelected] = useState<OrderRow | null>(null);

  useEffect(() => {
    (async () => {
      const supabase = createClient();
      if (!supabase) {
        setLoading(false);
        return;
      }
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }
      setSignedIn(true);
      const { data } = await supabase
        .from("orders")
        .select("id, created_at, status, total, email, items, shipping_address")
        .order("created_at", { ascending: false });
      setOrders((data as OrderRow[]) ?? []);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading orders…</p>;
  }

  if (!signedIn) {
    return (
      <div className="border border-border p-12 text-center">
        <p className="font-serif text-2xl">Sign in to view your orders</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Orders placed while signed in show up here.
        </p>
        <Button asChild className="mt-6 rounded-none">
          <Link href="/sign-in">Sign in</Link>
        </Button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="border border-border p-12 text-center">
        <p className="font-serif text-2xl">No orders yet</p>
        <p className="mt-2 text-sm text-muted-foreground">
          When you complete a purchase, it&apos;ll appear here.
        </p>
        <Button asChild className="mt-6 rounded-none">
          <Link href="/shop">Start shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="border border-border">
        <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-6 border-b border-border bg-secondary/40 px-6 py-3 text-[10px] uppercase tracking-widest text-muted-foreground">
          <span>Order</span>
          <span>Date</span>
          <span>Status</span>
          <span className="text-right">Items</span>
          <span className="text-right">Total</span>
        </div>
        <ul>
          {orders.map((o, i) => {
            const count = (o.items ?? []).reduce(
              (n, it) => n + (it.quantity ?? 1),
              0,
            );
            return (
              <li key={o.id}>
                {i > 0 && <Separator />}
                <button
                  onClick={() => setSelected(o)}
                  aria-label={`View order ${o.id.slice(0, 8).toUpperCase()}`}
                  className="grid w-full grid-cols-[1fr_auto_auto_auto_auto] items-center gap-6 px-6 py-5 text-left text-sm transition-colors hover:bg-accent"
                >
                  <span className="font-mono text-xs tracking-tight">
                    {o.id.slice(0, 8).toUpperCase()}
                  </span>
                  <span className="text-muted-foreground">
                    {fmtDate(o.created_at)}
                  </span>
                  <Badge variant={o.status === "paid" ? "muted" : "outline"}>
                    {o.status === "paid" ? "Paid" : o.status}
                  </Badge>
                  <span className="text-right tabular-nums">{count}</span>
                  <span className="text-right tabular-nums">
                    {formatPrice(o.total)}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Select an order to see its details.
      </p>

      <Dialog
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
      >
        <DialogContent className="sm:max-w-md">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>
                  Order {selected.id.slice(0, 8).toUpperCase()}
                </DialogTitle>
                <div className="flex items-center gap-3 pt-1">
                  <span className="text-xs text-muted-foreground">
                    {fmtDate(selected.created_at)}
                  </span>
                  <Badge
                    variant={selected.status === "paid" ? "muted" : "outline"}
                  >
                    {selected.status === "paid" ? "Paid" : selected.status}
                  </Badge>
                </div>
              </DialogHeader>

              <ul className="mt-5 space-y-4">
                {(selected.items ?? []).map((it, idx) => {
                  const meta = [it.color, it.size].filter(Boolean).join(" · ");
                  const body = (
                    <>
                      <div className="relative h-16 w-12 shrink-0 overflow-hidden bg-muted">
                        {it.image && (
                          <ProductImage
                            src={it.image}
                            alt={it.name ?? "Item"}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm">{it.name ?? "Item"}</p>
                        {meta && (
                          <p className="mt-0.5 text-xs uppercase tracking-widest text-muted-foreground">
                            {meta}
                          </p>
                        )}
                        {it.quantity && it.quantity > 1 ? (
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            Qty {it.quantity}
                          </p>
                        ) : null}
                      </div>
                      {typeof it.amount === "number" && (
                        <span className="shrink-0 text-sm tabular-nums">
                          {formatPrice(it.amount)}
                        </span>
                      )}
                    </>
                  );
                  return (
                    <li key={idx}>
                      {it.slug ? (
                        <Link
                          href={`/shop/${it.slug}`}
                          onClick={() => setSelected(null)}
                          className="flex items-center gap-3 transition-opacity hover:opacity-70"
                        >
                          {body}
                        </Link>
                      ) : (
                        <div className="flex items-center gap-3">{body}</div>
                      )}
                    </li>
                  );
                })}
              </ul>

              <Separator className="my-4" />

              <div className="flex items-center justify-between text-sm">
                <span className="uppercase tracking-widest">Total</span>
                <span className="tabular-nums">
                  {formatPrice(selected.total)}
                </span>
              </div>

              {selected.shipping_address && (
                <div className="mt-5">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    Shipping to
                  </p>
                  <address className="mt-2 text-sm not-italic leading-relaxed text-muted-foreground">
                    {[
                      selected.shipping_address.line1,
                      selected.shipping_address.line2,
                      [
                        selected.shipping_address.city,
                        selected.shipping_address.state,
                        selected.shipping_address.postal_code,
                      ]
                        .filter(Boolean)
                        .join(", "),
                      selected.shipping_address.country,
                    ]
                      .filter(Boolean)
                      .map((line, idx) => (
                        <span key={idx} className="block">
                          {line}
                        </span>
                      ))}
                  </address>
                </div>
              )}

              {selected.email && (
                <p className="mt-4 text-xs text-muted-foreground">
                  Confirmation sent to {selected.email}
                </p>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
