"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient, isSupabaseEnabled } from "@/lib/supabase/client";

export function AccountClient() {
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseEnabled) {
      setEmail(sessionStorage.getItem("form-demo-user"));
      setLoading(false);
      return;
    }
    const supabase = createClient();
    if (!supabase) {
      setLoading(false);
      return;
    }
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading…</p>;
  }

  if (!email) {
    return (
      <div className="border border-border p-8">
        <h2 className="font-serif text-2xl">You're not signed in</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to view your orders, save addresses and manage your account.
        </p>
        <div className="mt-6 flex gap-3">
          <Button asChild className="rounded-none">
            <Link href="/sign-in">Sign in</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-none">
            <Link href="/sign-up">Create account</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="border border-border p-8">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Signed in as
        </p>
        <p className="mt-2 text-base">{email}</p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Link
          href="/account/orders"
          className="border border-border p-6 hover:bg-accent"
        >
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Recent
          </p>
          <p className="mt-2 font-serif text-2xl">Orders</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Track shipments and view past orders.
          </p>
        </Link>
        <Link
          href="/account/wishlist"
          className="border border-border p-6 hover:bg-accent"
        >
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Saved
          </p>
          <p className="mt-2 font-serif text-2xl">Wishlist</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Pieces you've saved for later.
          </p>
        </Link>
      </div>
    </div>
  );
}
