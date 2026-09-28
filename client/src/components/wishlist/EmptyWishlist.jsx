import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";

export default function EmptyWishlist() {
  return (
    <div className="rounded-2xl bg-white p-12 text-center shadow">

      <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-50">
        <FiHeart
          size={42}
          className="text-red-500"
        />
      </div>

      <h2 className="text-3xl font-bold">
        Your Wishlist is Empty
      </h2>

      <p className="mt-3 text-gray-500">
        Save your favourite products here and
        purchase them later.
      </p>

      <Link
        to="/products"
        className="mt-8 inline-block rounded-xl bg-orange-500 px-8 py-3 font-semibold text-white transition hover:bg-orange-600"
      >
        Browse Products
      </Link>

    </div>
  );
}