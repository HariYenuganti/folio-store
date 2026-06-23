"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProductImage } from "@/components/product-image";
import { formatPrice } from "@/lib/utils";

export interface OrderItem {
  name?: string;
  slug?: string | null;
  size?: string | null;
  color?: string | null;
  image?: string | null;
  quantity?: number;
  amount?: number;
}

export interface Address {
  line1?: string | null;
  line2?: string | null;
  city?: string | null;
  state?: string | null;
  postal_code?: string | null;
  country?: string | null;
}

export interface OrderRow {
  id: string;
  created_at: string;
  status: string;
  total: number;
  email: string | null;
  items: OrderItem[];
  shipping_address: Address | null;
}

export const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

function OrderBody({
  order,
  onNavigate,
}: {
  order: OrderRow;
  onNavigate: () => void;
}) {
  const subtotal = (order.items ?? []).reduce(
    (sum, it) => sum + (it.amount ?? 0),
    0,
  );
  const shipping = Math.max(0, order.total - subtotal);

  return (
    <div>
      {/* Header */}
      <div className="border-b border-border px-6 py-5 pr-12">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl normal-case tracking-normal">
            Order {order.id.slice(0, 8).toUpperCase()}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-2 flex items-center gap-3">
          <span className="text-xs text-muted-foreground">
            {fmtDate(order.created_at)}
          </span>
          <Badge variant={order.status === "paid" ? "muted" : "outline"}>
            {order.status === "paid" ? "Paid" : order.status}
          </Badge>
        </div>
      </div>

      {/* Items */}
      <ul className="divide-y divide-border px-6">
        {(order.items ?? []).map((it, idx) => {
          const meta = [it.color, it.size].filter(Boolean).join(" · ");
          const inner = (
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
                <p className="truncate text-sm">{it.name ?? "Item"}</p>
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
            <li key={idx} className="py-4">
              {it.slug ? (
                <Link
                  href={`/shop/${it.slug}`}
                  onClick={onNavigate}
                  className="flex items-center gap-4 transition-opacity hover:opacity-70"
                >
                  {inner}
                </Link>
              ) : (
                <div className="flex items-center gap-4">{inner}</div>
              )}
            </li>
          );
        })}
      </ul>

      {/* Summary */}
      <div className="border-t border-border px-6 py-5">
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <span>Subtotal</span>
            <span className="tabular-nums text-foreground">
              {formatPrice(subtotal)}
            </span>
          </div>
          <div className="flex items-center justify-between text-muted-foreground">
            <span>Shipping</span>
            <span className="tabular-nums text-foreground">
              {shipping === 0 ? "Free" : formatPrice(shipping)}
            </span>
          </div>
        </div>

        <Separator className="my-3" />

        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            Total
          </span>
          <span className="text-base tabular-nums">
            {formatPrice(order.total)}
          </span>
        </div>

        {order.shipping_address && (
          <div className="mt-5">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Shipping to
            </p>
            <address className="mt-1.5 text-sm not-italic leading-relaxed text-muted-foreground">
              {[
                order.shipping_address.line1,
                order.shipping_address.line2,
                [
                  order.shipping_address.city,
                  order.shipping_address.state,
                  order.shipping_address.postal_code,
                ]
                  .filter(Boolean)
                  .join(", "),
                order.shipping_address.country,
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

        {order.email && (
          <p className="mt-4 text-xs text-muted-foreground">
            Order email: {order.email}
          </p>
        )}
      </div>
    </div>
  );
}

export function OrderDetailDialog({
  order,
  onOpenChange,
}: {
  order: OrderRow | null;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={!!order} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] gap-0 overflow-y-auto rounded-xl p-0 sm:max-w-md">
        {order && (
          <OrderBody order={order} onNavigate={() => onOpenChange(false)} />
        )}
      </DialogContent>
    </Dialog>
  );
}
