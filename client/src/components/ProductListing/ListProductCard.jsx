import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";

export default function ListProductCard({ product }) {
  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg md:flex-row">

      <img
        src={product.image}
        alt={product.name}
        className="h-44 w-44 object-contain"
      />

      <div className="flex flex-1 flex-col">

        <p className="text-sm font-semibold text-orange-500">
          {product.brand}
        </p>

        <Link
          to={`/product/${product.slug}`}
          className="mt-2 text-2xl font-bold text-[#102B52]"
        >
          {product.name}
        </Link>

        <p className="mt-3 text-slate-500">
          Premium quality product from {product.brand}.
        </p>

        <div className="mt-auto flex items-center justify-between">

          <div>
            <p className="text-3xl font-black text-[#102B52]">
              ₹{product.price}
            </p>

            {product.oldPrice && (
              <p className="text-slate-400 line-through">
                ₹{product.oldPrice}
              </p>
            )}
          </div>

          <button className="flex items-center gap-2 rounded-xl bg-[#102B52] px-5 py-3 text-white transition hover:bg-orange-500">
            <FiShoppingCart />
            Add to Cart
          </button>

        </div>

      </div>

    </div>
  );
}