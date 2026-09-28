import { FiHeart } from "react-icons/fi";

export default function FlashCard({ product }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition">

      <div className="relative bg-gray-100 h-56 flex items-center justify-center">

        <span className="absolute top-4 left-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
          -{product.discount}%
        </span>

        <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center">
          <FiHeart />
        </button>

        <img
          src={product.image}
          alt={product.name}
          className="h-40 object-contain"
        />

      </div>

      <div className="p-5">

        <h3 className="font-bold">
          {product.name}
        </h3>

        <div className="mt-3 flex items-center gap-3">

          <span className="text-xl font-bold">
            ₹{product.price}
          </span>

          <span className="line-through text-gray-400">
            ₹{product.oldPrice}
          </span>

        </div>

      </div>

    </div>
  );
}