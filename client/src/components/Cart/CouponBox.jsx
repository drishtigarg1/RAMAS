import { useState } from "react";
import { useCart } from "../../context/CartContext";

export default function CouponBox() {
  const {
    coupon,
    discount,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const handleApply = () => {
    const result = applyCoupon(code);

    setMessage(result.message);

    if (result.success) {
      setCode("");
    }
  };

  return (
    <div className="mb-6 rounded-2xl border bg-white p-5 shadow-sm">

      <h3 className="mb-4 text-lg font-semibold">
        Coupon Code
      </h3>

      {!coupon ? (
        <>
          <div className="flex gap-3">

            <input
              value={code}
              onChange={(e) =>
                setCode(e.target.value)
              }
              placeholder="Enter coupon"
              className="flex-1 rounded-lg border px-4 py-3 outline-none focus:border-orange-500"
            />

            <button
              onClick={handleApply}
              className="rounded-lg bg-orange-500 px-6 text-white hover:bg-orange-600"
            >
              Apply
            </button>

          </div>

          {message && (
            <p
              className={`mt-3 text-sm ${
                message.includes("success")
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}
        </>
      ) : (
        <div className="flex items-center justify-between rounded-lg bg-green-50 p-4">

          <div>
            <p className="font-semibold text-green-700">
              {coupon}
            </p>

            <p className="text-sm text-green-600">
              {discount}% discount applied
            </p>
          </div>

          <button
            onClick={removeCoupon}
            className="text-red-500 hover:underline"
          >
            Remove
          </button>

        </div>
      )}

    </div>
  );
}