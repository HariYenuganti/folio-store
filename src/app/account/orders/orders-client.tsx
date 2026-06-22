"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

interface OrderRow {
  id: string;
  created_at: string;
  status: string;
  total: number;
  items: { quantity?: number }[];
}

export function OrdersClient() {
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
  const [orders, setOrders] = useState<OrderRow[]>([]);

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
        .select("id, created_at, status, total, items")
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
              <div className="grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-6 px-6 py-5 text-sm">
                <span className="font-mono text-xs tracking-tight">
                  {o.id.slice(0, 8).toUpperCase()}
                </span>
                <span className="text-muted-foreground">
                  {new Date(o.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </span>
                <Badge variant={o.status === "paid" ? "muted" : "outline"}>
                  {o.status === "paid" ? "Paid" : o.status}
                </Badge>
                <span className="text-right tabular-nums">{count}</span>
                <span className="text-right tabular-nums">
                  {formatPrice(o.total)}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
