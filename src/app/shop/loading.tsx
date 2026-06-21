import { Skeleton } from "@/components/ui/skeleton";
import { ProductGridSkeleton } from "@/components/product-grid-skeleton";

export default function ShopLoading() {
  return (
    <div className="container py-12">
      <div className="mb-10 max-w-2xl">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="mt-3 h-10 w-64" />
        <Skeleton className="mt-3 h-4 w-80" />
      </div>
      <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
        <aside className="hidden space-y-4 lg:block">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-32" />
          ))}
        </aside>
        <ProductGridSkeleton count={8} />
      </div>
    </div>
  );
}
