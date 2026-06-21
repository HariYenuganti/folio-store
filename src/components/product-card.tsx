import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  const onSale = !!product.compareAtPrice;
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group flex flex-col"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 will-change-transform group-hover:scale-[1.03]"
        />
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt=""
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}
        <div className="absolute left-3 top-3 flex flex-col gap-1">
          {product.newArrival && <Badge variant="outline">New</Badge>}
          {onSale && <Badge variant="sale">Sale</Badge>}
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm">{product.name}</p>
          <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
            {product.collection}
          </p>
        </div>
        <div className="flex flex-col items-end text-sm tabular-nums">
          {onSale ? (
            <>
              <span className="text-destructive">
                {formatPrice(product.price)}
              </span>
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice!)}
              </span>
            </>
          ) : (
            <span>{formatPrice(product.price)}</span>
          )}
        </div>
      </div>

      <div className="mt-2 flex gap-1.5">
        {product.colors.slice(0, 4).map((c) => (
          <span
            key={c.name}
            className="h-3 w-3 rounded-full border border-border"
            style={{ backgroundColor: c.hex }}
            title={c.name}
          />
        ))}
      </div>
    </Link>
  );
}
