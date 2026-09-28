import {
  FiStar,
  FiCheckCircle,
} from "react-icons/fi";

export default function ProductInfo({ product }) {

  const discount = Math.round(
    ((product.price - product.discountPrice) /
      product.price) *
      100
  );

  return (
    <div>

      <p className="text-orange-500 font-semibold">
        {product.brand}
      </p>

      <h1 className="text-4xl font-black mt-2 text-[#102B52]">
        {product.name}
      </h1>

      <div className="flex items-center gap-3 mt-4">

        <FiStar className="text-yellow-500 fill-yellow-500" />

        <span>{product.rating}</span>

        <span className="text-slate-400">
          ({product.reviews} Reviews)
        </span>

      </div>

      <div className="flex items-center gap-4 mt-8">

        <span className="text-4xl font-black text-orange-500">
          ₹{product.discountPrice}
        </span>

        <span className="line-through text-slate-400 text-xl">
          ₹{product.price}
        </span>

        <span className="rounded-full bg-red-100 px-3 py-1 text-red-600 font-semibold">
          {discount}% OFF
        </span>

      </div>

      <div className="mt-6 flex items-center gap-2 text-green-600">

        <FiCheckCircle />

        <span>
          {product.stock > 0
            ? "In Stock"
            : "Out of Stock"}
        </span>

      </div>

      <p className="mt-8 text-slate-600 leading-7">
        {product.shortDescription}
      </p>

    </div>
  );
}