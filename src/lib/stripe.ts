import Stripe from "stripe";
import { appUrl, env, isStripeConfigured } from "@/lib/env";

export const isStripeEnabled = isStripeConfigured;

export const stripe = isStripeEnabled
  ? new Stripe(env.STRIPE_SECRET_KEY!, {
      apiVersion: "2025-09-30.clover" as Stripe.LatestApiVersion,
      typescript: true,
    })
  : null;

export function getAppUrl() {
  return appUrl;
}
