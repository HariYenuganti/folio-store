"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient, isSupabaseEnabled } from "@/lib/supabase/client";

export function AuthForm({ mode }: { mode: "sign-in" | "sign-up" }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email"));
    const password = String(fd.get("password"));

    if (!isSupabaseEnabled) {
      // Demo mode — no real auth backend. Persist a token and move on.
      sessionStorage.setItem("form-demo-user", email);
      toast.success("Signed in (demo mode)", {
        description: "Add Supabase env vars to enable real auth.",
      });
      router.push("/account");
      setPending(false);
      return;
    }

    const supabase = createClient();
    if (!supabase) {
      toast.error("Auth client failed to initialise.");
      setPending(false);
      return;
    }

    const fn =
      mode === "sign-in"
        ? supabase.auth.signInWithPassword({ email, password })
        : supabase.auth.signUp({ email, password });

    const { error } = await fn;
    if (error) {
      toast.error(error.message);
    } else {
      toast.success(mode === "sign-in" ? "Welcome back" : "Account created");
      router.push("/account");
    }
    setPending(false);
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-5">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="mt-2 rounded-none"
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          minLength={6}
          placeholder="••••••••"
          className="mt-2 rounded-none"
        />
      </div>
      <Button
        type="submit"
        size="lg"
        className="w-full rounded-none"
        disabled={pending}
      >
        {pending
          ? "Please wait…"
          : mode === "sign-in"
            ? "Sign in"
            : "Create account"}
      </Button>
      {!isSupabaseEnabled && (
        <p className="text-center text-[10px] uppercase tracking-widest text-muted-foreground">
          Demo mode · Add Supabase env vars to enable real auth
        </p>
      )}
    </form>
  );
}
