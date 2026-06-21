"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart, cartSubtotal } from "@/store/cart";
import { formatPrice } from "@/lib/utils";

export function CheckoutClient() {
  const router = useRouter();
  const { items, clear } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const subtotal = cartSubtotal(items);
  const shipping = subtotal >= 20000 ? 0 : 1500;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="container flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="font-serif text-3xl">Nothing to check out</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Your bag is empty.
        </p>
        <Button asChild className="mt-6 rounded-none">
          <a href="/shop">Continue shopping</a>
        </Button>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ items, email: new FormData(e.currentTarget).get("email") }),
      });
      const data: { url?: string; mockOrderId?: string; error?: string } =
        await res.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      if (data.mockOrderId) {
        clear();
        router.push(`/checkout/success?order=${data.mockOrderId}`);
        return;
      }
      toast.error(data.error ?? "Something went wrong");
    } catch {
      toast.error("Couldn't reach the server.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container py-12">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Checkout
        </p>
        <h1 className="mt-2 font-serif text-4xl">Almost there</h1>
      </div>

      <form
        onSubmit={onSubmit}
        className="grid gap-12 lg:grid-cols-[1fr_400px]"
      >
        {/* Form */}
        <div className="space-y-10">
          <section>
            <h2 className="text-xs uppercase tracking-widest text-muted-foreground">
              Contact
            </h2>
            <div className="mt-4 grid gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="mt-2 rounded-none"
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xs uppercase tracking-widest text-muted-foreground">
              Shipping
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="firstName">First name</Label>
                <Input id="firstName" name="firstName" required className="mt-2 rounded-none" />
              </div>
              <div>
                <Label htmlFor="lastName">Last name</Label>
                <Input id="lastName" name="lastName" required className="mt-2 rounded-none" />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" required className="mt-2 rounded-none" />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" required className="mt-2 rounded-none" />
              </div>
              <div>
                <Label htmlFor="postal">Postal code</Label>
                <Input id="postal" name="postal" required className="mt-2 rounded-none" />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  required
                  defaultValue="United States"
                  className="mt-2 rounded-none"
                />
              </div>
            </div>
          </section>

          <Button
            type="submit"
            size="lg"
            className="w-full rounded-none"
            disabled={submitting}
          >
            <Lock className="h-4 w-4" />
            {submitting ? "Redirecting…" : `Pay ${formatPrice(total)}`}
          </Button>
          <p className="text-center text-[10px] uppercase tracking-widest text-muted-foreground">
            Secure checkout · Powered by Stripe
          </p>
        </div>

        {/* Summary */}
        <aside className="self-start border border-border bg-card p-6">
          <h2 className="text-xs uppercase tracking-widest text-muted-foreground">
            Order summary
          </h2>
          <ul className="mt-4 space-y-4">
            {items.map((item) => (
              <li
                key={`${item.productId}-${item.size}-${item.color}`}
                className="flex gap-3"
              >
                <div className="relative aspect-[3/4] w-14 shrink-0 overflow-hidden bg-muted">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col text-xs">
                  <span>{item.name}</span>
                  <span className="text-muted-foreground">
                    {item.color} · {item.size} · ×{item.quantity}
                  </span>
                  <span className="mt-auto tabular-nums">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <Separator className="my-5" />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="tabular-nums">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="tabular-nums">
                {shipping === 0 ? "Free" : formatPrice(shipping)}
              </span>
            </div>
            <Separator className="my-3" />
            <div className="flex justify-between text-base">
              <span className="uppercase tracking-widest">Total</span>
              <span className="tabular-nums">{formatPrice(total)}</span>
            </div>
          </div>
        </aside>
      </form>
    </div>
  );
}
