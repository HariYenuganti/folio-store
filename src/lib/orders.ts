import type Stripe from "stripe";
import type { SupabaseClient } from "@supabase/supabase-js";
import { stripe } from "@/lib/stripe";

/**
 * Retrieve a Checkout Session with line items + products expanded. Returns null
 * if Stripe isn't configured or the session isn't paid/complete.
 */
export async function retrievePaidSession(sessionId: string) {
  if (!stripe) return null;
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items.data.price.product"],
  });
  const paid =
    session.payment_status === "paid" || session.status === "complete";
  return paid ? session : null;
}

/** Map a session's line items to the shape stored on the order. */
export function orderItemsFromSession(session: Stripe.Checkout.Session) {
  return (session.line_items?.data ?? []).map((li) => {
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
}

/**
 * Idempotently persist a paid order, and — when we know the buyer — save their
 * shipping address. Safe to call from both the success page (user-scoped
 * client, RLS) and the Stripe webhook (service-role client, no session). The
 * unique constraint on stripe_session_id makes repeat calls no-ops.
 */
export async function persistOrderFromSession(
  db: SupabaseClient,
  session: Stripe.Checkout.Session,
  userId: string | null,
) {
  const email = session.customer_details?.email ?? session.customer_email ?? "";

  await db.from("orders").upsert(
    {
      user_id: userId,
      email,
      status: "paid",
      total: session.amount_total ?? 0,
      items: orderItemsFromSession(session),
      stripe_session_id: session.id,
      shipping_address: session.customer_details?.address ?? null,
    },
    { onConflict: "stripe_session_id", ignoreDuplicates: true },
  );

  const addr = session.customer_details?.address;
  if (userId && addr?.line1 && addr.city && addr.postal_code) {
    await db.from("addresses").upsert(
      {
        user_id: userId,
        line1: addr.line1.trim(),
        line2: addr.line2?.trim() || null,
        city: addr.city.trim(),
        state: addr.state?.trim() || null,
        postal_code: addr.postal_code.trim(),
        country: addr.country?.trim() || "United States",
      },
      { onConflict: "user_id,addr_key", ignoreDuplicates: true },
    );
  }
}
