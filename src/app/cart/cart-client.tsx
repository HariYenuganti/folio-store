"use client";

import Link from "next/link";
import { ProductImage } from "@/components/product-image";
import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart, cartSubtotal } from "@/store/cart";
import { formatPrice } from "@/lib/utils";

export function CartPageClient() {
  const { items, setQuantity, remove } = useCart();
  const subtotal = cartSubtotal(items);
  const shipping = subtotal >= 20000 ? 0 : 1500;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="container flex min-h-[60vh] flex-col items-center justify-center text-center">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Your bag
        </p>
        <h1 className="mt-3 font-serif text-4xl">Empty</h1>
        <p className="mt-3 max-w-md text-sm text-muted-foreground">
          Add a few pieces to your bag and they'll appear here.
        </p>
        <Button asChild className="mt-8 rounded-none" size="lg">
          <Link href="/shop">Browse the shop</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Bag
        </p>
        <h1 className="mt-2 font-serif text-4xl">Your bag</h1>
      </div>

      <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
        <ul className="divide-y divide-border border-y border-border">
          {items.map((item) => (
            <li
              key={`${item.productId}-${item.size}-${item.color}`}
              className="flex gap-5 py-6"
            >
              <Link
                href={`/shop/${item.slug}`}
                className="relative aspect-[3/4] w-28 shrink-0 overflow-hidden bg-muted sm:w-32"
              >
                <ProductImage
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </Link>
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link
                      href={`/shop/${item.slug}`}
                      className="text-base hover:underline"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                      {item.color} · Size {item.size}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      remove(item.productId, item.size, item.color)
                    }
                    aria-label="Remove item"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-auto flex items-end justify-between pt-4">
                  <div className="flex items-center border border-border">
                    <button
                      aria-label="Decrease"
                      onClick={() =>
                        setQuantity(
                          item.productId,
                          item.size,
                          item.color,
                          item.quantity - 1,
                        )
                      }
                      className="px-3 py-2 hover:bg-accent"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="min-w-[2.25rem] text-center text-sm tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      aria-label="Increase"
                      onClick={() =>
                        setQuantity(
                          item.productId,
                          item.size,
                          item.color,
                          item.quantity + 1,
                        )
                      }
                      className="px-3 py-2 hover:bg-accent"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <span className="text-base tabular-nums">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="self-start border border-border bg-card p-6">
          <h2 className="text-xs uppercase tracking-widest text-muted-foreground">
            Order summary
          </h2>
          <div className="mt-4 space-y-2 text-sm">
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
          <Button asChild size="lg" className="mt-6 w-full rounded-none">
            <Link href="/checkout">Checkout</Link>
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Have a promo code? Apply it at checkout.
          </p>
          <p className="mt-2 text-center text-[10px] uppercase tracking-widest text-muted-foreground">
            Secure checkout · Stripe
          </p>
        </aside>
      </div>
    </div>
  );
}
