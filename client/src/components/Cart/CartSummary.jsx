import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

import ShippingProgress from "./ShippingProgress";
import CouponBox from "./CouponBox";
import DeliveryInfo from "./DeliveryInfo";

export default function CartSummary() {
  const {
    subtotal,
    shipping,
    gst,
    total,
    discount,
    discountAmount,
  } = useCart();
const { isAuthenticated } = useAuth();
const navigate = useNavigate();

const handleCheckout = () => {
  if (!isAuthenticated) {
    navigate("/login", {
      state: {
        from: {
          pathname: "/checkout",
        },
      },
    });

    return;
  }

  navigate("/checkout");
};


  return (
    <div className="sticky top-28 space-y-6">

      {/* Shipping Progress */}
      <ShippingProgress />

      {/* Coupon Section */}
      <CouponBox />

      {/* Order Summary */}
      <div className="rounded-2xl bg-white p-6 shadow-lg">

        <h2 className="mb-6 text-2xl font-bold">
          Order Summary
        </h2>

        <div className="space-y-4">

          {/* Subtotal */}
          <div className="flex justify-between">
            <span className="text-gray-600">
              Subtotal
            </span>

            <span className="font-semibold">
              ₹{subtotal}
            </span>
          </div>

          {/* Discount */}
          {discount > 0 && (
            <div className="flex justify-between">
              <span className="text-green-600">
                Discount ({discount}%)
              </span>

              <span className="font-semibold text-green-600">
                -₹{discountAmount}
              </span>
            </div>
          )}

          {/* Shipping */}
          <div className="flex justify-between">
            <span className="text-gray-600">
              Shipping
            </span>

            <span className="font-semibold">
              {shipping === 0 ? (
                <span className="text-green-600">
                  FREE
                </span>
              ) : (
                `₹${shipping}`
              )}
            </span>
          </div>

          {/* GST */}
          <div className="flex justify-between">
            <span className="text-gray-600">
              GST (18%)
            </span>

            <span className="font-semibold">
              ₹{gst}
            </span>
          </div>

          <hr />

          {/* Total */}
          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>

            <span className="text-orange-500">
              ₹{total}
            </span>
          </div>

        </div>

        {/* Checkout Button */}
       <button
  onClick={handleCheckout}
  className="mt-8 w-full rounded-xl bg-orange-500 py-3 font-semibold text-white transition-all duration-300 hover:bg-orange-600 hover:shadow-lg active:scale-95"
>
  Proceed to Checkout
</button>

        {/* Continue Shopping */}
       <Link
  to="/products"
  className="mt-4 block w-full rounded-xl border border-orange-500 py-3 text-center font-semibold text-orange-500 transition-all duration-300 hover:bg-orange-50"
>
  Continue Shopping
</Link>

        {/* Shipping Hint */}
        {shipping > 0 && (
          <p className="mt-4 text-center text-sm text-gray-500">
            Add products worth{" "}
            <span className="font-semibold text-orange-500">
              ₹{499 - subtotal}
            </span>{" "}
            more to get{" "}
            <span className="font-semibold text-green-600">
              FREE Shipping
            </span>
            .
          </p>
        )}

      </div>

      {/* Delivery Information */}
      <DeliveryInfo />

    </div>
  );
}