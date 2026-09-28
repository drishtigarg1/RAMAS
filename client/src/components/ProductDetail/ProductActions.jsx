import { useState } from "react";
import {
  FiHeart,
  FiShare2,
  FiTruck,
  FiShield,
  FiMinus,
  FiPlus,
  FiShoppingCart,
} from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ProductActions({ product }) {
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(product, qty);
    toast.success(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    addToCart(product, qty);
    navigate("/checkout");
  };

  const handleWishlist = () => {
    toggleWishlist(product);
    if (!isInWishlist(product._id)) {
      toast.success(`${product.name} added to wishlist!`);
    } else {
      toast.error(`${product.name} removed from wishlist!`);
    }
  };

  return (
    <div className="sticky top-28 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">

      {/* Quantity */}

      <h3 className="text-lg font-bold text-[#102B52]">
        Quantity
      </h3>

      <div className="mt-4 flex w-fit items-center overflow-hidden rounded-xl border">

        <button
          onClick={() => qty > 1 && setQty(qty - 1)}
          className="px-4 py-3 hover:bg-slate-100"
        >
          <FiMinus />
        </button>

        <span className="w-12 text-center font-semibold">
          {qty}
        </span>

        <button
          onClick={() => setQty(qty + 1)}
          className="px-4 py-3 hover:bg-slate-100"
        >
          <FiPlus />
        </button>

      </div>

      {/* Buttons */}

      <button
        onClick={handleAddToCart}
        className="
          mt-8
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-orange-500
          py-4
          font-semibold
          text-white
          transition
          hover:bg-orange-600
        "
      >
        <FiShoppingCart />
        Add to Cart
      </button>

      <button
        onClick={handleBuyNow}
        className="
          mt-3
          w-full
          rounded-xl
          bg-[#102B52]
          py-4
          font-semibold
          text-white
          transition
          hover:bg-[#0b1d38]
        "
      >
        Buy Now
      </button>

      <div className="mt-4 grid grid-cols-2 gap-3">

        <button 
          onClick={handleWishlist}
          className={`rounded-xl border py-3 hover:bg-slate-50 transition-colors ${isInWishlist(product._id) ? "bg-red-50 text-red-500 border-red-200" : ""}`}
        >
          <FiHeart className={`mx-auto mb-1 ${isInWishlist(product._id) ? "fill-current text-red-500" : ""}`} />
          {isInWishlist(product._id) ? "Saved" : "Wishlist"}
        </button>

        <button 
          onClick={() => {
             navigator.clipboard.writeText(window.location.href);
             toast.success("Link copied!");
          }}
          className="rounded-xl border py-3 hover:bg-slate-50"
        >
          <FiShare2 className="mx-auto mb-1" />
          Share
        </button>

      </div>

      {/* Services */}

      <div className="mt-8 space-y-4">

        <div className="flex items-start gap-3">

          <FiTruck
            className="mt-1 text-orange-500"
            size={20}
          />

          <div>
            <h4 className="font-semibold">
              Free Delivery
            </h4>

            <p className="text-sm text-slate-500">
              On orders above ₹999
            </p>
          </div>

        </div>

        <div className="flex items-start gap-3">

          <FiShield
            className="mt-1 text-green-600"
            size={20}
          />

          <div>
            <h4 className="font-semibold">
              GST Invoice Available
            </h4>

            <p className="text-sm text-slate-500">
              Suitable for schools, offices and institutions.
            </p>
          </div>

        </div>

      </div>

      {/* Bulk Order */}

      <div className="mt-8 rounded-2xl bg-orange-50 p-4">

        <h4 className="font-semibold text-orange-600">
          Need Bulk Quantity?
        </h4>

        <p className="mt-2 text-sm text-slate-600">
          Contact us for bulk pricing,
          institutional supply and government orders.
        </p>

        <button
          className="
            mt-4
            w-full
            rounded-xl
            border
            border-orange-500
            py-3
            font-semibold
            text-orange-600
            transition
            hover:bg-orange-500
            hover:text-white
          "
        >
          Request Bulk Quote
        </button>

      </div>

    </div>
  );
}