"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient, isSupabaseEnabled } from "@/lib/supabase/client";

const authSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type AuthValues = z.infer<typeof authSchema>;

export function AuthForm({ mode }: { mode: "sign-in" | "sign-up" }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<AuthValues>({
    resolver: zodResolver(authSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = handleSubmit(async ({ email, password }) => {
    if (!isSupabaseEnabled) {
      // Demo mode — no real auth backend. Persist a token and move on.
      sessionStorage.setItem("form-demo-user", email);
      toast.success("Signed in (demo mode)", {
        description: "Add Supabase env vars to enable real auth.",
      });
      router.push("/account");
      return;
    }

    const supabase = createClient();
    if (!supabase) {
      toast.error("Auth client failed to initialise.");
      return;
    }

    const { error } =
      mode === "sign-in"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

    if (error) {
      setError("root", { message: error.message });
      toast.error(error.message);
      return;
    }

    toast.success(mode === "sign-in" ? "Welcome back" : "Account created");
    router.push("/account");
  });

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

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          autoComplete={
            mode === "sign-in" ? "current-password" : "new-password"
          }
          placeholder="••••••••"
          className="mt-2 rounded-none"
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? "password-error" : undefined}
          {...register("password")}
        />
        {errors.password && (
          <p
            id="password-error"
            role="alert"
            className="mt-1.5 text-xs text-destructive"
          >
            {errors.password.message}
          </p>
        )}
      </div>

      {errors.root && (
        <p role="alert" className="text-xs text-destructive">
          {errors.root.message}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full rounded-none"
        disabled={isSubmitting}
      >
        {isSubmitting
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
