import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-20 shadow">
      <FiShoppingCart
        size={80}
        className="text-orange-400"
      />

      <h2 className="mt-6 text-3xl font-bold">
        Your Cart is Empty
      </h2>

      <p className="mt-2 text-gray-500">
        Looks like you haven't added any products yet.
      </p>

      <Link
  to="/products"
  className="mt-4 block w-full rounded-xl border border-orange-500 py-3 text-center font-semibold text-orange-500 transition-all duration-300 hover:bg-orange-50"
>
  Continue Shopping
</Link>
    </div>
  );
}