import { createClient } from "@supabase/supabase-js";
import { env, isSupabaseConfigured } from "@/lib/env";

/**
 * Service-role Supabase client — bypasses RLS. SERVER-ONLY: never import this
 * into client code. Used by the Stripe webhook to persist orders without a user
 * session. Returns null when Supabase / the service key isn't configured.
 */
export function createAdminClient() {
  if (!isSupabaseConfigured || !env.SUPABASE_SERVICE_ROLE_KEY) return null;
  return createClient(
    env.NEXT_PUBLIC_SUPABASE_URL!,
    env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
