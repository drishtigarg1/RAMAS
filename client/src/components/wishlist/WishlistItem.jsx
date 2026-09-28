import { Link } from "react-router-dom";
import {
  FiShoppingCart,
  FiTrash2,
  FiHeart,
} from "react-icons/fi";

import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

export default function WishlistItem({ item }) {
  const { removeFromWishlist } =
    useWishlist();

  const { addToCart } = useCart();

  const price =
    item.discountPrice ?? item.price;

  const handleMoveToCart = () => {
    addToCart(item);
    removeFromWishlist(item._id);
  };

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-lg">

      <div className="flex flex-col gap-5 md:flex-row">

        <Link
          to={`/product/${item.slug}`}
        >
          <img
            src={item.image}
            alt={item.name}
            className="h-32 w-32 rounded-xl object-cover"
          />
        </Link>

        <div className="flex flex-1 flex-col justify-between">

          <div>

            <Link
              to={`/product/${item.slug}`}
            >
              <h2 className="text-xl font-semibold hover:text-orange-500">
                {item.name}
              </h2>
            </Link>

            <p className="mt-2 text-sm text-gray-500">
              {item.brand}
            </p>

            <div className="mt-3 flex items-center gap-3">

              <span className="text-2xl font-bold text-orange-500">
                ₹{price}
              </span>

              {item.discountPrice && (
                <span className="text-gray-400 line-through">
                  ₹{item.price}
                </span>
              )}

            </div>

          </div>

          <div className="mt-5 flex flex-wrap gap-3">

            <button
              onClick={handleMoveToCart}
              className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-white transition hover:bg-orange-600"
            >
              <FiShoppingCart />

              Move to Cart
            </button>

            <button
              onClick={() =>
                removeFromWishlist(item._id)
              }
              className="flex items-center gap-2 rounded-xl border border-red-500 px-5 py-3 text-red-500 transition hover:bg-red-50"
            >
              <FiTrash2 />

              Remove
            </button>

          </div>

        </div>

        <FiHeart
          className="self-start text-red-500"
          size={24}
        />

      </div>

    </div>
  );
}