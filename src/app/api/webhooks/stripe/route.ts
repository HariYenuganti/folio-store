import { NextResponse } from "next/server";
import { stripe, isStripeEnabled } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import { retrievePaidSession, persistOrderFromSession } from "@/lib/orders";
import type Stripe from "stripe";

/**
 * Stripe webhook handler. Persists paid orders authoritatively — independent of
 * whether the buyer ever reaches the success page (closed tab, guest checkout).
 * Uses the service-role client to write past RLS, and is idempotent via the
 * unique constraint on stripe_session_id.
 */
export async function POST(req: Request) {
  if (!isStripeEnabled || !stripe) {
    return NextResponse.json({ ok: true, mock: true });
  }
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "STRIPE_WEBHOOK_SECRET not set" },
      { status: 400 },
    );
  }
  const sig = req.headers.get("stripe-signature");
  if (!sig)
    return NextResponse.json({ error: "missing signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    const body = await req.text();
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "bad signature";
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const db = createAdminClient();
    if (db) {
      try {
        // Re-fetch with line items expanded; ignore if not actually paid.
        const full = await retrievePaidSession(session.id);
        if (full) {
          await persistOrderFromSession(
            db,
            full,
            full.client_reference_id ?? null,
          );
        }
      } catch (err) {
        // Return 500 so Stripe retries (the upsert is idempotent, so retrying
        // a transient failure is safe).
        console.error("[stripe webhook] failed to persist order", err);
        return NextResponse.json({ error: "persist failed" }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ received: true });
}
