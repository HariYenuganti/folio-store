import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * PKCE callback: exchanges the Auth Code (from email confirmation, password
 * reset, or OAuth) for a session, then redirects to `next`. With @supabase/ssr
 * the code verifier lives in a cookie, so the exchange happens server-side here.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/account";

  if (code) {
    const supabase = await createClient();
    if (supabase) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        // In production we sit behind Vercel's proxy — prefer the forwarded
        // host so the redirect lands on the public URL, not the internal one.
        const forwardedHost = request.headers.get("x-forwarded-host");
        const isLocal = process.env.NODE_ENV === "development";
        const base =
          !isLocal && forwardedHost ? `https://${forwardedHost}` : origin;
        return NextResponse.redirect(`${base}${next}`);
      }
    }
  }

  return NextResponse.redirect(`${origin}/sign-in?error=auth_callback`);
}
