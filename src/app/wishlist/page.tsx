import { WishlistClient } from "./wishlist-client";

export const metadata = { title: "Wishlist" };

export default function WishlistPage() {
  return (
    <div className="container py-12">
      <div className="mb-10 max-w-2xl">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Saved
        </p>
        <h1 className="mt-2 font-serif text-4xl md:text-5xl">Wishlist</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Pieces you&apos;ve saved for later.
        </p>
      </div>
      <WishlistClient />
    </div>
  );
}
