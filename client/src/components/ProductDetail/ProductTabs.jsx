import { useState } from "react";

export default function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <section className="mt-20">
      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        {[
          { id: "description", label: "Description" },
          { id: "specifications", label: "Specifications" },
          { id: "reviews", label: "Reviews" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-4 font-semibold transition ${
              activeTab === tab.id
                ? "border-b-2 border-orange-500 text-orange-500"
                : "text-slate-500 hover:text-orange-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Description */}
      {activeTab === "description" && (
        <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-[#102B52]">
            Product Description
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            {product.description}
          </p>
        </div>
      )}

      {/* Specifications */}
      {activeTab === "specifications" && (
        <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-[#102B52] mb-6">
            Specifications
          </h2>

          <div className="overflow-hidden rounded-xl border">
            {Object.entries(product.specifications).map(
              ([key, value]) => (
                <div
                  key={key}
                  className="grid grid-cols-2 border-b last:border-b-0"
                >
                  <div className="bg-slate-50 px-6 py-4 font-medium">
                    {key}
                  </div>

                  <div className="px-6 py-4">
                    {value}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* Reviews */}
      {activeTab === "reviews" && (
        <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-[#102B52]">
            Customer Reviews
          </h2>

          <div className="mt-6 flex items-center gap-3">
            <span className="text-5xl font-black text-orange-500">
              {product.rating}
            </span>

            <div>
              <p className="font-semibold">
                ★★★★★
              </p>

              <p className="text-slate-500">
                {product.reviews} verified reviews
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-xl bg-slate-50 p-5">
            <p className="italic text-slate-600">
              Review functionality will be connected to the backend in the next phase.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}