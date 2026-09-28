import { useWishlist } from "../context/WishlistContext";

import WishlistItem from "../components/wishlist/WishlistItem";
import EmptyWishlist from "../components/wishlist/EmptyWishlist";

export default function Wishlist() {

  const { wishlistItems } =
    useWishlist();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">

      <h1 className="mb-8 text-4xl font-bold">
        My Wishlist
      </h1>

      {wishlistItems.length === 0 ? (
        <EmptyWishlist />
      ) : (
        <div className="space-y-6">

          {wishlistItems.map((item) => (
            <WishlistItem
              key={item._id}
              item={item}
            />
          ))}

        </div>
      )}

    </div>
  );
}