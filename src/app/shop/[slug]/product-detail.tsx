"use client";

import { useState } from "react";
import { ProductImage } from "@/components/product-image";
import { toast } from "sonner";
import { Minus, Plus, ShoppingBag, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useCart } from "@/store/cart";
import { formatPrice, cn } from "@/lib/utils";
import type { Product, Size } from "@/types";

export function ProductDetail({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState<Size | null>(null);
  const [color, setColor] = useState(product.colors[0].name);
  const [quantity, setQuantity] = useState(1);
  const add = useCart((s) => s.add);

  const onSale = !!product.compareAtPrice;

  const handleAdd = () => {
    if (!size) {
      toast.error("Please select a size.");
      return;
    }
    add({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size,
      color,
      quantity,
    });
    toast.success(`Added to bag — ${product.name}`, {
      description: `${color} · ${size}`,
    });
  };

  return (
    <section className="container grid gap-10 pb-16 pt-4 lg:grid-cols-2 lg:gap-16">
      {/* Gallery */}
      <div>
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          <ProductImage
            src={product.images[activeImage]}
            alt={product.name}
            fallbackLabel={product.name}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        </div>
        {product.images.length > 1 && (
          <div className="mt-3 grid grid-cols-4 gap-3">
            {product.images.map((src, i) => (
              <button
                key={src}
                onClick={() => setActiveImage(i)}
                className={cn(
                  "relative aspect-square overflow-hidden border bg-muted transition-opacity",
                  i === activeImage
                    ? "border-foreground opacity-100"
                    : "border-transparent opacity-70 hover:opacity-100"
                )}
              >
                <ProductImage
                  src={src}
                  alt=""
                  fill
                  sizes="20vw"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          {product.collection}
        </p>
        <h1 className="mt-3 font-serif text-4xl">{product.name}</h1>

        <div className="mt-4 flex items-baseline gap-3">
          <span
            className={cn(
              "text-lg tabular-nums",
              onSale && "text-destructive"
            )}
          >
            {formatPrice(product.price)}
          </span>
          {onSale && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.compareAtPrice!)}
            </span>
          )}
        </div>

        <p className="mt-6 text-pretty text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>

        {/* Color */}
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Color
            </p>
            <p className="text-xs uppercase tracking-widest">{color}</p>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setColor(c.name)}
                aria-label={c.name}
                className={cn(
                  "h-9 w-9 rounded-full border-2 transition-all",
                  color === c.name
                    ? "border-foreground"
                    : "border-transparent ring-1 ring-border hover:ring-foreground/50"
                )}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>

        {/* Size */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Size
            </p>
            <button className="text-xs uppercase tracking-widest underline-offset-4 hover:underline">
              Size guide
            </button>
          </div>
          <div className="mt-3 grid grid-cols-6 gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={cn(
                  "border py-2.5 text-xs uppercase tracking-widest transition-colors",
                  size === s
                    ? "border-foreground bg-foreground text-background"
                    : "border-border hover:border-foreground"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity + Add */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <div className="flex h-12 items-center border border-border">
            <button
              aria-label="Decrease"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex h-full w-12 items-center justify-center hover:bg-accent"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="min-w-[2.5rem] text-center text-sm tabular-nums">
              {quantity}
            </span>
            <button
              aria-label="Increase"
              onClick={() => setQuantity((q) => q + 1)}
              className="flex h-full w-12 items-center justify-center hover:bg-accent"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <Button
            size="lg"
            className="flex-1 rounded-none"
            onClick={handleAdd}
          >
            <ShoppingBag className="h-4 w-4" />
            Add to bag · {formatPrice(product.price * quantity)}
          </Button>
        </div>

        {/* Trust row */}
        <div className="mt-6 grid grid-cols-3 gap-3 border-y border-border py-5 text-center text-[10px] uppercase tracking-widest text-muted-foreground">
          <div className="flex flex-col items-center gap-2">
            <Truck className="h-4 w-4" />
            Free shipping over $200
          </div>
          <div className="flex flex-col items-center gap-2">
            <RotateCcw className="h-4 w-4" />
            30-day returns
          </div>
          <div className="flex flex-col items-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            Lifetime repairs
          </div>
        </div>

        {/* Details accordion */}
        <Accordion type="single" collapsible className="mt-2">
          <AccordionItem value="details">
            <AccordionTrigger>Details & materials</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-1.5">
                {product.details.map((d) => (
                  <li key={d} className="flex gap-2">
                    <span className="text-muted-foreground">·</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="shipping">
            <AccordionTrigger>Shipping & returns</AccordionTrigger>
            <AccordionContent>
              <p>
                Complimentary carbon-neutral shipping on orders over $200.
                Returns accepted within 30 days of delivery — unworn, with
                original tags.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="care">
            <AccordionTrigger>Care</AccordionTrigger>
            <AccordionContent>
              <p>
                Wash cold inside out. Tumble dry low or hang to dry. Avoid
                bleach. For wool pieces, dry clean only.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
