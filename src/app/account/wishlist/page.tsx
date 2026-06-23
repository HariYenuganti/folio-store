import { WishlistClient } from "@/app/wishlist/wishlist-client";

export const metadata = { title: "Wishlist" };

export default function AccountWishlistPage() {
  return (
    <div>
      <h2 className="mb-6 font-serif text-2xl">Wishlist</h2>
      <WishlistClient />
    </div>
  );
}
