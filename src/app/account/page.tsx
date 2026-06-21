import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AccountClient } from "./account-client";

export const metadata = { title: "Account" };

export default function AccountPage() {
  return (
    <div className="container py-12">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Your account
        </p>
        <h1 className="mt-2 font-serif text-4xl">Account</h1>
      </div>

      <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
        <aside>
          <nav className="flex flex-col text-sm">
            <Link
              href="/account"
              className="border-l-2 border-foreground py-2 pl-4 text-foreground"
            >
              Profile
            </Link>
            <Link
              href="/account/orders"
              className="border-l-2 border-transparent py-2 pl-4 text-muted-foreground hover:text-foreground"
            >
              Orders
            </Link>
            <Link
              href="#"
              className="border-l-2 border-transparent py-2 pl-4 text-muted-foreground hover:text-foreground"
            >
              Addresses
            </Link>
            <Link
              href="#"
              className="border-l-2 border-transparent py-2 pl-4 text-muted-foreground hover:text-foreground"
            >
              Wishlist
            </Link>
          </nav>
          <Separator className="my-6" />
          <Button asChild variant="outline" size="sm" className="w-full">
            <Link href="/sign-in">Sign out</Link>
          </Button>
        </aside>

        <section>
          <AccountClient />
        </section>
      </div>
    </div>
  );
}
