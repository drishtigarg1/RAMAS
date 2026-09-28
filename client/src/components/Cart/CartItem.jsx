import { Link } from "react-router-dom";
import {
  FiMinus,
  FiPlus,
  FiTrash2,
  FiCheckCircle,
} from "react-icons/fi";

import { useCart } from "../../context/CartContext";

export default function CartItem({ item }) {
  const {
    increaseQty,
    decreaseQty,
    removeFromCart,
  } = useCart();

  const price = item.discountPrice ?? item.price;
  const originalPrice = item.price;
  const total = price * item.quantity;
  const savings =
    item.discountPrice &&
    originalPrice > price
      ? (originalPrice - price) * item.quantity
      : 0;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      <div className="flex flex-col gap-6 md:flex-row">

        {/* Product Image */}
        <Link
          to={`/product/${item.slug || item._id}`}
          className="mx-auto md:mx-0"
        >
          <img
            src={item.image}
            alt={item.name}
            className="h-32 w-32 rounded-xl border object-cover transition-transform duration-300 hover:scale-105"
          />
        </Link>

        {/* Product Details */}
        <div className="flex flex-1 flex-col justify-between">

          <div>

            <Link
              to={`/product/${item.slug || item._id}`}
            >
              <h2 className="text-xl font-semibold transition hover:text-orange-500">
                {item.name}
              </h2>
            </Link>

            {item.brand && (
              <p className="mt-1 text-sm text-gray-500">
                {item.brand}
              </p>
            )}

            <div className="mt-3 flex flex-wrap items-center gap-3">

              <span className="text-2xl font-bold text-orange-500">
                ₹{price}
              </span>

              {item.discountPrice && (
                <>
                  <span className="text-gray-400 line-through">
                    ₹{originalPrice}
                  </span>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    Save ₹{originalPrice - price}
                  </span>
                </>
              )}

            </div>

            <div className="mt-3 flex items-center gap-2 text-sm text-green-600">

              <FiCheckCircle />

              <span>In Stock</span>

            </div>

          </div>

          {/* Bottom Row */}
          <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            {/* Quantity Controls */}
            <div className="flex items-center rounded-xl border">

              <button
                onClick={() => decreaseQty(item._id)}
                className="p-3 transition hover:bg-orange-50"
              >
                <FiMinus />
              </button>

              <span className="w-12 text-center font-semibold">
                {item.quantity}
              </span>

              <button
                onClick={() => increaseQty(item._id)}
                className="p-3 transition hover:bg-orange-50"
              >
                <FiPlus />
              </button>

            </div>

            {/* Price & Remove */}
            <div className="flex flex-col items-end gap-2">

              <div>

                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Subtotal
                </p>

                <p className="text-xl font-bold text-orange-600">
                  ₹{total}
                </p>

                {savings > 0 && (
                  <p className="text-sm text-green-600">
                    You saved ₹{savings}
                  </p>
                )}

              </div>

              <button
                onClick={() => removeFromCart(item._id)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-red-500 transition hover:bg-red-50"
              >
                <FiTrash2 />

                <span>Remove</span>
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}