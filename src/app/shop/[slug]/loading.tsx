import { Skeleton } from "@/components/ui/skeleton";

export default function ProductLoading() {
  return (
    <section className="container grid gap-10 pb-16 pt-8 lg:grid-cols-2 lg:gap-16">
      <div>
        <Skeleton className="aspect-[4/5] w-full" />
        <div className="mt-3 grid grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square" />
          ))}
        </div>
      </div>
      <div className="space-y-5">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    </section>
  );
}
