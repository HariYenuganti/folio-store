import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SuccessClear } from "./success-clear";
import { stripe, isStripeEnabled } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Order confirmed" };

/**
 * Records the paid order for the signed-in user, idempotently. Uses the
 * authoritative Stripe session (amount + line items) rather than client cart
 * state, and the server Supabase client (RLS: user can insert their own order).
 */
async function recordOrder(sessionId: string) {
  if (!isStripeEnabled || !stripe) return;
  const supabase = await createClient();
  if (!supabase) return;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items.data.price.product"],
    });
    if (session.payment_status !== "paid" && session.status !== "complete")
      return;

    const items = (session.line_items?.data ?? []).map((li) => {
      const product = li.price?.product;
      const prod =
        product && typeof product === "object" && !("deleted" in product)
          ? product
          : null;
      const meta = prod?.metadata ?? {};
      return {
        name: meta.name ?? prod?.name ?? li.description,
        slug: meta.slug ?? null,
        size: meta.size ?? null,
        color: meta.color ?? null,
        image: prod?.images?.[0] ?? null,
        quantity: li.quantity ?? 1,
        amount: li.amount_total,
      };
    });

    await supabase.from("orders").upsert(
      {
        user_id: user.id,
        email: user.email ?? session.customer_details?.email ?? null,
        status: "paid",
        total: session.amount_total ?? 0,
        items,
        stripe_session_id: session.id,
        shipping_address: session.customer_details?.address ?? null,
      },
      { onConflict: "stripe_session_id", ignoreDuplicates: true },
    );
  } catch {
    // Best-effort — never block the confirmation page.
  }
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string; order?: string }>;
}) {
  const sp = await searchParams;
  if (sp.session_id) await recordOrder(sp.session_id);

  const orderId =
    sp.order ??
    (sp.session_id ? sp.session_id.slice(-12).toUpperCase() : "DEMO");

  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center text-center">
      <SuccessClear />
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-foreground">
        <Check className="h-6 w-6" />
      </div>
      <p className="mt-6 text-xs uppercase tracking-widest text-muted-foreground">
        Thank you for your order
      </p>
      <h1 className="mt-3 font-serif text-4xl">Order confirmed</h1>
      <p className="mt-4 max-w-md text-sm text-muted-foreground">
        We&apos;ve sent a confirmation to your email. Your pieces are being
        prepared with care and will ship within 2–3 business days.
      </p>
      <p className="mt-6 text-xs uppercase tracking-widest text-muted-foreground">
        Order reference
      </p>
      <p className="mt-1 font-mono text-sm tracking-tight">{orderId}</p>

      <div className="mt-10 flex gap-3">
        <Button asChild variant="outline" className="rounded-none">
          <Link href="/account/orders">View orders</Link>
        </Button>
        <Button asChild className="rounded-none">
          <Link href="/shop">Keep browsing</Link>
        </Button>
      </div>
    </div>
  );
}
