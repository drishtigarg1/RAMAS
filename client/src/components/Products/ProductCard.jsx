import toast from "react-hot-toast";
import {
  FiHeart,
  FiShoppingCart,
  FiStar,
} from "react-icons/fi";
import { Link } from "react-router-dom";

import useCart from "../../hooks/useCart";
import { useWishlist } from "../../context/WishlistContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const {
    toggleWishlist,
    isInWishlist,
  } = useWishlist();

  const hasDiscount =
    product.discountPrice &&
    product.discountPrice < product.price;

  const discount = hasDiscount
    ? Math.round(
        ((product.price - product.discountPrice) /
          product.price) *
          100
      )
    : 0;

  const finalPrice = hasDiscount
    ? product.discountPrice
    : product.price;

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlist = () => {
    toggleWishlist(product);
    if (!wished) {
      toast.success(`${product.name} added to wishlist!`);
    } else {
      toast.error(`${product.name} removed from wishlist!`);
    }
  };

  const wished = isInWishlist(product._id);

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Product Image */}
      <div className="relative">

        <Link to={`/product/${product.slug}`}>
          <img
            src={product.image}
            alt={product.name}
            className="h-56 w-full object-cover transition duration-300 hover:scale-105"
          />
        </Link>

        {hasDiscount && (
          <span className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
            {discount}% OFF
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          aria-label="Wishlist"
          className={`absolute right-3 top-3 rounded-full p-2 shadow transition-all duration-300 ${
            wished
              ? "bg-red-500 text-white"
              : "bg-white hover:bg-orange-500 hover:text-white"
          }`}
        >
          <FiHeart
            className={`transition-transform duration-300 ${
              wished ? "scale-110 fill-current" : ""
            }`}
          />
        </button>

      </div>

      {/* Product Details */}
      <div className="p-5">

        <Link to={`/product/${product.slug}`}>
          <h3 className="text-lg font-semibold transition hover:text-orange-500">
            {product.name}
          </h3>
        </Link>

        <p className="mt-1 text-sm text-gray-500">
          {product.brand}
        </p>

        <div className="mt-3 flex items-center gap-2">

          <FiStar className="text-yellow-500" />

          <span className="font-medium">
            {product.rating}
          </span>

          <span className="text-sm text-gray-400">
            ({product.reviews})
          </span>

        </div>

        <div className="mt-4 flex items-center gap-3">

          <span className="text-2xl font-bold text-orange-500">
            ₹{finalPrice}
          </span>

          {hasDiscount && (
            <span className="text-gray-400 line-through">
              ₹{product.price}
            </span>
          )}

        </div>

        <button
          onClick={handleAddToCart}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 py-3 font-medium text-white transition hover:bg-orange-600 active:scale-[0.98]"
        >
          <FiShoppingCart />

          Add to Cart
        </button>

      </div>

    </div>
  );
}