import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export const isSupabaseEnabled = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function createClient() {
  if (!isSupabaseEnabled) return null;
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(
          values: { name: string; value: string; options?: CookieOptions }[]
        ) {
          try {
            values.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll may be called from a Server Component — ignore.
          }
        },
      },
    }
  );
}
