import { z } from "zod";

/**
 * Validated environment variables.
 *
 * Every integration is optional — the app runs in mock mode when nothing is
 * configured — but when a value IS present it must be well-formed (e.g. a real
 * URL). Validation runs once at import time and fails loudly with a readable
 * message instead of surfacing a cryptic runtime error later.
 */
const optionalUrl = z.string().url().optional().or(z.literal(""));

const schema = z.object({
  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: optionalUrl,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  // Database (Drizzle / Postgres)
  DATABASE_URL: z.string().optional(),
  // Stripe
  STRIPE_SECRET_KEY: z.string().optional(),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  // App
  NEXT_PUBLIC_APP_URL: optionalUrl,
});

// Reference each variable statically so Next can inline the NEXT_PUBLIC_ ones.
const parsed = schema.safeParse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  DATABASE_URL: process.env.DATABASE_URL,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
});

if (!parsed.success) {
  console.error(
    "❌ Invalid environment variables:\n",
    parsed.error.flatten().fieldErrors,
  );
  throw new Error("Invalid environment variables — see the log above.");
}

export const env = parsed.data;

/** Feature flags derived from configured env. */
export const isSupabaseConfigured = Boolean(
  env.NEXT_PUBLIC_SUPABASE_URL && env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);
export const isStripeConfigured = Boolean(env.STRIPE_SECRET_KEY);
export const isDatabaseConfigured = Boolean(env.DATABASE_URL);

export const appUrl = env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
