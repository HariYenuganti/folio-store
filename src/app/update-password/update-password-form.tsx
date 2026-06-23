"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient, isSupabaseEnabled } from "@/lib/supabase/client";

const schema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    path: ["confirm"],
    message: "Passwords don't match.",
  });
type Values = z.infer<typeof schema>;

export function UpdatePasswordForm() {
  const router = useRouter();
  const [state, setState] = useState<"checking" | "ok" | "no-session">(
    "checking",
  );
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { password: "", confirm: "" },
  });

  useEffect(() => {
    if (!isSupabaseEnabled) {
      setState("no-session");
      return;
    }
    const supabase = createClient();
    if (!supabase) {
      setState("no-session");
      return;
    }
    supabase.auth
      .getUser()
      .then(({ data }) => setState(data.user ? "ok" : "no-session"));
  }, []);

  const onSubmit = handleSubmit(async ({ password }) => {
    const supabase = createClient();
    if (!supabase) return;
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Password updated");
    router.push("/account");
    router.refresh();
  });

  if (state === "checking") {
    return (
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Verifying your reset link…
      </p>
    );
  }

  if (state === "no-session") {
    return (
      <div className="mt-8 border border-border p-6 text-center">
        <p className="text-sm leading-relaxed text-muted-foreground">
          This reset link is invalid or has expired. Request a new one.
        </p>
        <Button asChild className="mt-5 rounded-none">
          <Link href="/forgot-password">Request new link</Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-8 space-y-5">
      <div>
        <Label htmlFor="password">New password</Label>
        <Input
          id="password"
          type="password"
          autoComplete="new-password"
          placeholder="••••••••"
          className="mt-2 rounded-none"
          aria-invalid={!!errors.password}
          {...register("password")}
        />
        {errors.password && (
          <p role="alert" className="mt-1.5 text-xs text-destructive">
            {errors.password.message}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="confirm">Confirm new password</Label>
        <Input
          id="confirm"
          type="password"
          autoComplete="new-password"
          placeholder="••••••••"
          className="mt-2 rounded-none"
          aria-invalid={!!errors.confirm}
          {...register("confirm")}
        />
        {errors.confirm && (
          <p role="alert" className="mt-1.5 text-xs text-destructive">
            {errors.confirm.message}
          </p>
        )}
      </div>
      <Button
        type="submit"
        size="lg"
        className="w-full rounded-none"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Updating…" : "Update password"}
      </Button>
    </form>
  );
}
