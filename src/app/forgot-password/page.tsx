import Link from "next/link";
import { ForgotPasswordForm } from "./forgot-password-form";

export const metadata = { title: "Reset password" };

export default function ForgotPasswordPage() {
  return (
    <div className="container flex min-h-[70vh] items-center justify-center py-12">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Forgot your password?
          </p>
          <h1 className="mt-2 font-serif text-3xl">Reset password</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Enter your email and we&apos;ll send a link to set a new one.
          </p>
        </div>
        <ForgotPasswordForm />
        <p className="mt-8 text-center text-xs text-muted-foreground">
          Remembered it?{" "}
          <Link
            href="/sign-in"
            className="text-foreground underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
