"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient, isSupabaseEnabled } from "@/lib/supabase/client";

const schema = z.object({
  email: z.string().email("Enter a valid email address."),
});
type Values = z.infer<typeof schema>;

export function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });
  const [sent, setSent] = useState(false);

  const onSubmit = handleSubmit(async ({ email }) => {
    if (!isSupabaseEnabled) {
      toast.error("Password reset requires Supabase to be configured.");
      return;
    }
    const supabase = createClient();
    if (!supabase) {
      toast.error("Auth client failed to initialise.");
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/update-password`,
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    setSent(true);
    toast.success("Reset link sent");
  });

  if (sent) {
    return (
      <p
        role="status"
        className="mt-8 border border-border bg-secondary/40 p-4 text-sm leading-relaxed"
      >
        If an account exists for that email, we&apos;ve sent a link to set a new
        password. Check your inbox.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-8 space-y-5">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className="mt-2 rounded-none"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...register("email")}
        />
        {errors.email && (
          <p
            id="email-error"
            role="alert"
            className="mt-1.5 text-xs text-destructive"
          >
            {errors.email.message}
          </p>
        )}
      </div>
      <Button
        type="submit"
        size="lg"
        className="w-full rounded-none"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending…" : "Send reset link"}
      </Button>
    </form>
  );
}
