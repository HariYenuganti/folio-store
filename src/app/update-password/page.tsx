import { UpdatePasswordForm } from "./update-password-form";

export const metadata = { title: "Set a new password" };

export default function UpdatePasswordPage() {
  return (
    <div className="container flex min-h-[70vh] items-center justify-center py-12">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Almost done
          </p>
          <h1 className="mt-2 font-serif text-3xl">Set a new password</h1>
        </div>
        <UpdatePasswordForm />
      </div>
    </div>
  );
}
