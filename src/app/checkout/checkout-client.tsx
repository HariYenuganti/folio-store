"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ProductImage } from "@/components/product-image";
import { Lock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Separator } from "@/components/ui/separator";
import { useCart, cartSubtotal } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import { shippingFor } from "@/lib/shipping";

const checkoutSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  address: z.string().min(1, "Required"),
  city: z.string().min(1, "Required"),
  postal: z.string().min(1, "Required"),
  country: z.string().min(1, "Required"),
});

type CheckoutValues = z.infer<typeof checkoutSchema>;

export function CheckoutClient() {
  const router = useRouter();
  const { items, clear } = useCart();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { country: "United States" },
  });
  const subtotal = cartSubtotal(items);
  const shipping = shippingFor(subtotal);
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="container flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="font-serif text-3xl">Nothing to check out</h1>
        <p className="mt-3 text-sm text-muted-foreground">Your bag is empty.</p>
        <Button asChild className="mt-6 rounded-none">
          <Link href="/shop">Continue shopping</Link>
        </Button>
      </div>
    );
  }

  const onSubmit = handleSubmit(async (values) => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ items, email: values.email }),
      });
      const data: { url?: string; mockOrderId?: string; error?: string } =
        await res.json();
      if (data.url) {
        window.location.assign(data.url);
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
    }
  });

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
        noValidate
        className="grid gap-12 lg:grid-cols-[1fr_400px]"
      >
        {/* Form */}
        <div className="space-y-10">
          <section>
            <h2 className="text-xs uppercase tracking-widest text-muted-foreground">
              Contact
            </h2>
            <div className="mt-4 grid gap-4">
              <FormField
                id="email"
                label="Email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                error={errors.email?.message}
                {...register("email")}
              />
            </div>
          </section>

          <section>
            <h2 className="text-xs uppercase tracking-widest text-muted-foreground">
              Shipping
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <FormField
                id="firstName"
                label="First name"
                autoComplete="given-name"
                error={errors.firstName?.message}
                {...register("firstName")}
              />
              <FormField
                id="lastName"
                label="Last name"
                autoComplete="family-name"
                error={errors.lastName?.message}
                {...register("lastName")}
              />
              <FormField
                id="address"
                label="Address"
                autoComplete="street-address"
                containerClassName="sm:col-span-2"
                error={errors.address?.message}
                {...register("address")}
              />
              <FormField
                id="city"
                label="City"
                autoComplete="address-level2"
                error={errors.city?.message}
                {...register("city")}
              />
              <FormField
                id="postal"
                label="Postal code"
                autoComplete="postal-code"
                error={errors.postal?.message}
                {...register("postal")}
              />
              <FormField
                id="country"
                label="Country"
                autoComplete="country-name"
                containerClassName="sm:col-span-2"
                error={errors.country?.message}
                {...register("country")}
              />
            </div>
          </section>

          <Button
            type="submit"
            size="lg"
            className="w-full rounded-none"
            disabled={isSubmitting}
          >
            <Lock className="h-4 w-4" />
            {isSubmitting ? "Redirecting…" : `Pay ${formatPrice(total)}`}
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
                  <ProductImage
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
