import Link from "next/link";
import { AuthForm } from "../auth-form";

export const metadata = { title: "Sign in" };

export default function SignInPage() {
  return (
    <div className="container flex min-h-[70vh] items-center justify-center py-12">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Welcome back
          </p>
          <h1 className="mt-2 font-serif text-3xl">Sign in</h1>
        </div>
        <AuthForm mode="sign-in" />
        <p className="mt-8 text-center text-xs text-muted-foreground">
          New here?{" "}
          <Link
            href="/sign-up"
            className="text-foreground underline-offset-4 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
