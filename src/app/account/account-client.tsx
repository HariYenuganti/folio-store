"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { createClient, isSupabaseEnabled } from "@/lib/supabase/client";

const profileSchema = z.object({
  fullName: z.string().max(80, "Keep it under 80 characters.").optional(),
});
type ProfileValues = z.infer<typeof profileSchema>;

const passwordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    path: ["confirm"],
    message: "Passwords don't match.",
  });
type PasswordValues = z.infer<typeof passwordSchema>;

export function AccountClient() {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);
  const [demo, setDemo] = useState(false);

  const profileForm = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { fullName: "" },
  });
  const passwordForm = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: "", confirm: "" },
  });

  useEffect(() => {
    if (!isSupabaseEnabled) {
      setEmail(sessionStorage.getItem("form-demo-user"));
      setDemo(true);
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
      profileForm.reset({
        fullName: (data.user?.user_metadata?.full_name as string) ?? "",
      });
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSaveProfile = profileForm.handleSubmit(async ({ fullName }) => {
    const supabase = createClient();
    if (!supabase) return;
    const { error } = await supabase.auth.updateUser({
      data: { full_name: fullName?.trim() || null },
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Profile updated");
  });

  const onChangePassword = passwordForm.handleSubmit(async ({ password }) => {
    const supabase = createClient();
    if (!supabase) return;
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Password updated");
    passwordForm.reset({ password: "", confirm: "" });
  });

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading…</p>;
  }

  if (!email) {
    return (
      <div className="border border-border p-8">
        <h2 className="font-serif text-2xl">You&apos;re not signed in</h2>
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
    <div className="space-y-8">
      <div className="border border-border p-8">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Signed in as
        </p>
        <p className="mt-2 text-base">{email}</p>
      </div>

      {/* Edit profile + change password — real auth only */}
      {!demo && (
        <div className="grid gap-6 md:grid-cols-2">
          <form
            onSubmit={onSaveProfile}
            noValidate
            className="space-y-4 border border-border p-6"
          >
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Profile
            </p>
            <FormField
              id="fullName"
              label="Display name"
              placeholder="Your name"
              autoComplete="name"
              error={profileForm.formState.errors.fullName?.message}
              {...profileForm.register("fullName")}
            />
            <Button
              type="submit"
              className="rounded-none"
              disabled={profileForm.formState.isSubmitting}
            >
              {profileForm.formState.isSubmitting ? "Saving…" : "Save"}
            </Button>
          </form>

          <form
            onSubmit={onChangePassword}
            noValidate
            className="space-y-4 border border-border p-6"
          >
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Change password
            </p>
            <FormField
              id="new-password"
              label="New password"
              type="password"
              autoComplete="new-password"
              error={passwordForm.formState.errors.password?.message}
              {...passwordForm.register("password")}
            />
            <FormField
              id="confirm-password"
              label="Confirm password"
              type="password"
              autoComplete="new-password"
              error={passwordForm.formState.errors.confirm?.message}
              {...passwordForm.register("confirm")}
            />
            <Button
              type="submit"
              className="rounded-none"
              disabled={passwordForm.formState.isSubmitting}
            >
              {passwordForm.formState.isSubmitting
                ? "Updating…"
                : "Update password"}
            </Button>
          </form>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
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
            Pieces you&apos;ve saved for later.
          </p>
        </Link>
      </div>
    </div>
  );
}
