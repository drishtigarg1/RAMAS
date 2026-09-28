import { useState } from "react";
import {
  FiMapPin,
  FiTruck,
  FiClock,
  FiShield,
  FiCheckCircle,
} from "react-icons/fi";

export default function DeliveryInfo() {
  const [pincode, setPincode] = useState("");
  const [checked, setChecked] = useState(false);

  const checkDelivery = () => {
    if (pincode.length === 6) {
      setChecked(true);
    }
  };

  return (
    <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="text-xl font-bold text-[#102B52]">
        Delivery Information
      </h2>

      <div className="mt-5 flex gap-3">

        <input
          type="text"
          maxLength={6}
          placeholder="Enter Pincode"
          value={pincode}
          onChange={(e) => {
            setPincode(e.target.value);
            setChecked(false);
          }}
          className="flex-1 rounded-xl border px-4 py-3 outline-none focus:border-orange-500"
        />

        <button
          onClick={checkDelivery}
          className="rounded-xl bg-orange-500 px-6 font-semibold text-white hover:bg-orange-600"
        >
          Check
        </button>

      </div>

      {checked && (
        <div className="mt-6 space-y-4">

          <div className="flex gap-3">

            <FiCheckCircle
              className="text-green-600 mt-1"
              size={20}
            />

            <div>

              <h4 className="font-semibold">
                Delivery Available
              </h4>

              <p className="text-sm text-slate-500">
                Estimated delivery in 2–4 business days.
              </p>

            </div>

          </div>

          <div className="flex gap-3">

            <FiTruck
              className="text-orange-500 mt-1"
              size={20}
            />

            <div>

              <h4 className="font-semibold">
                Free Shipping
              </h4>

              <p className="text-sm text-slate-500">
                On orders above ₹499.
              </p>

            </div>

          </div>

          <div className="flex gap-3">

            <FiClock
              className="text-blue-600 mt-1"
              size={20}
            />

            <div>

              <h4 className="font-semibold">
                Easy Returns
              </h4>

              <p className="text-sm text-slate-500">
                7-day hassle-free return policy.
              </p>

            </div>

          </div>

          <div className="flex gap-3">

            <FiShield
              className="text-green-600 mt-1"
              size={20}
            />

            <div>

              <h4 className="font-semibold">
                Secure Payment
              </h4>

              <p className="text-sm text-slate-500">
                100% secure online payment with GST invoice.
              </p>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}