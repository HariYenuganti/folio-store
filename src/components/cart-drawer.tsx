"use client";

import { ProductImage } from "@/components/product-image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart, cartSubtotal } from "@/store/cart";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, close, setQuantity, remove } = useCart();
  const subtotal = cartSubtotal(items);

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && close()}>
      <DialogContent side="right" className="flex flex-col p-0">
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <DialogTitle>Bag ({items.length})</DialogTitle>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6">
            <p className="text-sm text-muted-foreground">Your bag is empty.</p>
            <Button asChild variant="outline" size="sm" onClick={close}>
              <Link href="/shop">Browse the shop</Link>
            </Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto">
              {items.map((item) => (
                <li
                  key={`${item.productId}-${item.size}-${item.color}`}
                  className="flex gap-4 px-6 py-5"
                >
                  <Link
                    href={`/shop/${item.slug}`}
                    onClick={close}
                    className="relative aspect-[3/4] w-20 shrink-0 overflow-hidden bg-muted"
                  >
                    <ProductImage
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link
                          href={`/shop/${item.slug}`}
                          onClick={close}
                          className="text-sm hover:underline"
                        >
                          {item.name}
                        </Link>
                        <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                          {item.color} · {item.size}
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
                    <div className="mt-auto flex items-end justify-between pt-3">
                      <div className="flex items-center border border-border">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() =>
                            setQuantity(
                              item.productId,
                              item.size,
                              item.color,
                              item.quantity - 1
                            )
                          }
                          className="px-2 py-1 hover:bg-accent"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="min-w-[2rem] text-center text-xs">
                          {item.quantity}
                        </span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() =>
                            setQuantity(
                              item.productId,
                              item.size,
                              item.color,
                              item.quantity + 1
                            )
                          }
                          className="px-2 py-1 hover:bg-accent"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="text-sm tabular-nums">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-border px-6 py-5">
              <div className="flex items-center justify-between text-sm">
                <span className="uppercase tracking-widest text-muted-foreground">
                  Subtotal
                </span>
                <span className="tabular-nums">{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Shipping & taxes calculated at checkout.
              </p>
              <Separator className="my-4" />
              <div className="flex flex-col gap-2">
                <Button asChild size="lg" onClick={close}>
                  <Link href="/checkout">Checkout</Link>
                </Button>
                <Button asChild variant="outline" size="sm" onClick={close}>
                  <Link href="/cart">View bag</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
