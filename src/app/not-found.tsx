import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-xs uppercase tracking-widest text-muted-foreground">
        404
      </p>
      <h1 className="mt-3 font-serif text-5xl">Lost the thread.</h1>
      <p className="mt-4 max-w-md text-sm text-muted-foreground">
        The page you're looking for doesn't exist, or has been moved to the
        archive.
      </p>
      <Button asChild className="mt-8 rounded-none" size="lg">
        <Link href="/">Back to home</Link>
      </Button>
    </div>
  );
}
