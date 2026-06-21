import Stripe from "stripe";

export const isStripeEnabled = Boolean(process.env.STRIPE_SECRET_KEY);

export const stripe = isStripeEnabled
  ? new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2025-09-30.clover" as Stripe.LatestApiVersion,
      typescript: true,
    })
  : null;

export function getAppUrl() {
  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}
