import { NextResponse } from "next/server";
import { z } from "zod";
import { stripe, isStripeEnabled, getAppUrl } from "@/lib/stripe";
import type { CartItem } from "@/types";

const Body = z.object({
  email: z.string().email().nullable().optional(),
  items: z
    .array(
      z.object({
        productId: z.string(),
        slug: z.string(),
        name: z.string(),
        price: z.number().int().positive(),
        image: z.string().url(),
        size: z.string(),
        color: z.string(),
        quantity: z.number().int().positive(),
      }),
    )
    .min(1),
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = Body.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid cart payload." },
      { status: 400 },
    );
  }
  const { email, items } = parsed.data as {
    email?: string | null;
    items: CartItem[];
  };

  // Mock mode — no Stripe configured. Return a fake order id so the UI can
  // redirect to the success page without hitting Stripe.
  if (!isStripeEnabled || !stripe) {
    const mockOrderId = `mock_${Math.random().toString(36).slice(2, 10)}`;
    return NextResponse.json({ mockOrderId });
  }

  try {
    const appUrl = getAppUrl();
    // Mirror the UI's shipping rule (free over $200, else $15) so the amount
    // Stripe charges matches the total shown at checkout.
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const shippingAmount = subtotal >= 20000 ? 0 : 1500;
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: email ?? undefined,
      line_items: items.map((i) => ({
        quantity: i.quantity,
        price_data: {
          currency: "usd",
          unit_amount: i.price,
          product_data: {
            name: `${i.name} · ${i.color} · ${i.size}`,
            images: [i.image],
            metadata: {
              productId: i.productId,
              size: i.size,
              color: i.color,
            },
          },
        },
      })),
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "DE", "FR", "JP", "AU"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: shippingAmount, currency: "usd" },
            display_name:
              shippingAmount === 0 ? "Free shipping" : "Standard shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 2 },
              maximum: { unit: "business_day", value: 4 },
            },
          },
        },
      ],
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/cart`,
    });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Stripe error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
