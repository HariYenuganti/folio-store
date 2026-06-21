"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In production this is where you'd report to Sentry/your error tracker.
    console.error(error);
  }, [error]);

  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
        Something went wrong
      </p>
      <h1 className="mt-3 font-serif text-4xl md:text-5xl">
        A snag on our end.
      </h1>
      <p className="mt-4 max-w-md text-sm text-muted-foreground">
        We hit an unexpected error. You can try again, or head back to the shop.
      </p>
      <div className="mt-8 flex gap-3">
        <Button onClick={reset} size="lg" className="rounded-none">
          Try again
        </Button>
        <Button asChild variant="outline" size="lg" className="rounded-none">
          <Link href="/shop">Back to shop</Link>
        </Button>
      </div>
    </div>
  );
}
