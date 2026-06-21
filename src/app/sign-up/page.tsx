import Link from "next/link";
import { AuthForm } from "../auth-form";

export const metadata = { title: "Create account" };

export default function SignUpPage() {
  return (
    <div className="container flex min-h-[70vh] items-center justify-center py-12">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Join the studio
          </p>
          <h1 className="mt-2 font-serif text-3xl">Create account</h1>
        </div>
        <AuthForm mode="sign-up" />
        <p className="mt-8 text-center text-xs text-muted-foreground">
          Already a member?{" "}
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
