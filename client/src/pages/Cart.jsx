import { FiTrash2 } from "react-icons/fi";

import { useCart } from "../context/CartContext";

import CartItem from "../components/Cart/CartItem";
import CartSummary from "../components/Cart/CartSummary";
import EmptyCart from "../components/Cart/EmptyCart";

export default function Cart() {
  const {
    cartItems,
    cartCount,
    clearCart,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <EmptyCart />
      </div>
    );
  }

  return (
    <section className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>
            <h1 className="text-4xl font-bold">
              Shopping Cart
            </h1>

            <p className="mt-2 text-gray-500">
              {cartCount} item{cartCount > 1 ? "s" : ""} in your cart
            </p>
          </div>

          <button
            onClick={clearCart}
            className="flex items-center gap-2 rounded-lg border border-red-300 px-5 py-3 text-red-600 transition hover:bg-red-50"
          >
            <FiTrash2 />

            Clear Cart
          </button>
        </div>

        {/* Main Layout */}
        <div className="grid gap-8 lg:grid-cols-3">

          {/* Cart Items */}
          <div className="space-y-5 lg:col-span-2">

            {cartItems.map((item) => (
              <CartItem
                key={item._id}
                item={item}
              />
            ))}

          </div>

          {/* Summary */}
          <div>

            <CartSummary />

          </div>

        </div>
      </div>
    </section>
  );
}
