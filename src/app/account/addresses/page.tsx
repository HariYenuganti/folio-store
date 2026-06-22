import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AddressesClient } from "./addresses-client";

export const metadata = { title: "Addresses" };

export default function AddressesPage() {
  return (
    <div className="container py-12">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Your account
          </p>
          <h1 className="mt-2 font-serif text-4xl">Addresses</h1>
        </div>
        <Button asChild variant="outline" className="rounded-none">
          <Link href="/account">Back to account</Link>
        </Button>
      </div>

      <AddressesClient />
    </div>
  );
}
