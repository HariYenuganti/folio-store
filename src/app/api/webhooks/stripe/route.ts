import { NextResponse } from "next/server";
import { stripe, isStripeEnabled } from "@/lib/stripe";
import type Stripe from "stripe";

/**
 * Stripe webhook handler. In production you'd persist order state here using
 * the secret signing key. Left as a clear stub for the portfolio.
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

  switch (event.type) {
    case "checkout.session.completed": {
      // const session = event.data.object as Stripe.Checkout.Session;
      // TODO: persist order to DB using `session.id`, `customer_details`, etc.
      break;
    }
    default:
      break;
  }
  return NextResponse.json({ received: true });
}
