import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";
import { AccountNav } from "@/components/account-nav";

export default async function AccountLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Server-side guard: signed-out users never reach account pages (no client
  // flash). Skipped in mock mode, where "auth" is client-only sessionStorage.
  if (isSupabaseConfigured) {
    const supabase = await createClient();
    const {
      data: { user },
    } = (await supabase?.auth.getUser()) ?? { data: { user: null } };
    if (!user) redirect("/sign-in");
  }

  return (
    <div className="container py-12">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Your account
        </p>
        <h1 className="mt-2 font-serif text-4xl">Account</h1>
      </div>

      <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
        <AccountNav />
        <section className="min-w-0">{children}</section>
      </div>
    </div>
  );
}
