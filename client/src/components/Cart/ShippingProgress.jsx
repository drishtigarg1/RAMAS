import { useCart } from "../../context/CartContext";
import { FiTruck } from "react-icons/fi";

const FREE_SHIPPING_LIMIT = 499;

export default function ShippingProgress() {
  const { subtotal } = useCart();

  const progress = Math.min(
    (subtotal / FREE_SHIPPING_LIMIT) * 100,
    100
  );

  const remaining = Math.max(
    FREE_SHIPPING_LIMIT - subtotal,
    0
  );

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">

      <div className="mb-3 flex items-center gap-2">

        <FiTruck className="text-orange-500 text-xl" />

        <h3 className="font-semibold text-lg">
          Free Shipping
        </h3>

      </div>

      <div className="h-3 overflow-hidden rounded-full bg-gray-200">

        <div
          className="h-full rounded-full bg-orange-500 transition-all duration-500"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

      {remaining > 0 ? (
        <p className="mt-4 text-sm text-gray-600">
          Add
          <span className="font-bold text-orange-500">
            {" "}₹{remaining}{" "}
          </span>
          more to unlock
          <span className="font-semibold">
            {" "}FREE Shipping 🚚
          </span>
        </p>
      ) : (
        <p className="mt-4 font-semibold text-green-600">
          🎉 Congratulations!
          You unlocked FREE Shipping.
        </p>
      )}

    </div>
  );
}