import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export const metadata = { title: "Orders" };

const SAMPLE_ORDERS = [
  {
    id: "FRM-10247",
    date: "Jun 12, 2026",
    status: "Delivered",
    items: 3,
    total: 38500,
  },
  {
    id: "FRM-10198",
    date: "May 04, 2026",
    status: "Shipped",
    items: 1,
    total: 14500,
  },
  {
    id: "FRM-10112",
    date: "Mar 21, 2026",
    status: "Delivered",
    items: 2,
    total: 27000,
  },
];

export default function OrdersPage() {
  return (
    <div className="container py-12">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Your account
          </p>
          <h1 className="mt-2 font-serif text-4xl">Orders</h1>
        </div>
        <Button asChild variant="outline" className="rounded-none">
          <Link href="/account">Back to account</Link>
        </Button>
      </div>

      <div className="border border-border">
        <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-6 border-b border-border bg-secondary/40 px-6 py-3 text-[10px] uppercase tracking-widest text-muted-foreground">
          <span>Order</span>
          <span>Date</span>
          <span>Status</span>
          <span className="text-right">Items</span>
          <span className="text-right">Total</span>
        </div>
        <ul>
          {SAMPLE_ORDERS.map((o, i) => (
            <li key={o.id}>
              {i > 0 && <Separator />}
              <div className="grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-6 px-6 py-5 text-sm">
                <Link
                  href="#"
                  className="font-mono text-xs tracking-tight hover:underline"
                >
                  {o.id}
                </Link>
                <span className="text-muted-foreground">{o.date}</span>
                <Badge variant={o.status === "Delivered" ? "muted" : "outline"}>
                  {o.status}
                </Badge>
                <span className="text-right tabular-nums">{o.items}</span>
                <span className="text-right tabular-nums">
                  {formatPrice(o.total)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-6 text-xs text-muted-foreground">
        Sample orders shown for the portfolio demo. Real orders persist when
        Supabase + Stripe are configured.
      </p>
    </div>
  );
}
