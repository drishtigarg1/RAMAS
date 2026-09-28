import {
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiPackage,
} from "react-icons/fi";

export default function DeliveryInfo() {
  const today = new Date();

  const deliveryDate = new Date(today);
  deliveryDate.setDate(today.getDate() + 4);

  const options = {
    weekday: "short",
    day: "numeric",
    month: "short",
  };

  return (
    <div className="mt-6 rounded-2xl bg-white p-6 shadow-lg">

      <h2 className="mb-5 text-xl font-bold">
        Delivery Information
      </h2>

      <div className="space-y-5">

        <div className="flex items-start gap-3">
          <FiTruck className="mt-1 text-xl text-orange-500" />

          <div>
            <p className="font-semibold">
              Estimated Delivery
            </p>

            <p className="text-sm text-gray-600">
              {deliveryDate.toLocaleDateString(
                "en-IN",
                options
              )}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <FiPackage className="mt-1 text-xl text-orange-500" />

          <div>
            <p className="font-semibold">
              Stock Status
            </p>

            <p className="text-sm text-green-600">
              In Stock
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <FiShield className="mt-1 text-xl text-orange-500" />

          <div>
            <p className="font-semibold">
              Secure Payment
            </p>

            <p className="text-sm text-gray-600">
              100% secure payment gateway.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <FiRefreshCw className="mt-1 text-xl text-orange-500" />

          <div>
            <p className="font-semibold">
              Easy Returns
            </p>

            <p className="text-sm text-gray-600">
              Return eligible products within 7 days.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}