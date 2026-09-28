import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import {
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiMenu,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import SearchBar from "./SearchBar";
import DesktopMenu from "./DesktopMenu";
import TopBar from "./TopBar";
import GemPortalToggle from "./GemPortalToggle";

import useCart from "../../hooks/useCart";
import { useWishlist } from "../../context/WishlistContext";

export default function Navbar() {
  const { cartCount } = useCart();
const { wishlistCount } = useWishlist();
const { isAuthenticated, user } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
        fixed
        top-0
        left-0
        right-0
        z-[9999]
        w-full
        transition-all
        duration-300
        ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-xl"
            : "bg-white"
        }
      `}
    >
      {/* Top Bar */}
      <div
        className={`
          overflow-hidden
          transition-all
          duration-300
          ${
            scrolled
              ? "max-h-0 opacity-0"
              : "max-h-20 opacity-100"
          }
        `}
      >
        <TopBar />
      </div>

      {/* Header */}
      <div className="border-b border-slate-200 bg-white/95">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div
            className={`
              flex
              items-center
              justify-between
              gap-8
              transition-all
              duration-300
              ${scrolled ? "h-16" : "h-20"}
            `}
          >
            {/* Logo */}
            <Link
              to="/"
              className="group flex flex-col flex-shrink-0"
            >
              <span
                className={`
                  font-black
                  leading-none
                  text-[#102B52]
                  transition-all
                  duration-300
                  group-hover:text-orange-500
                  ${scrolled ? "text-3xl" : "text-4xl"}
                `}
              >
                RAMA
              </span>

              <span
                className="
                  mt-1
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[3px]
                  text-orange-500
                "
              >
                Stationers & Sports
              </span>
            </Link>

            {/* Desktop Search */}
            <div className="hidden flex-1 max-w-2xl lg:flex">
              <SearchBar />
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              <div className="hidden lg:block">
                <GemPortalToggle />
              </div>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="
                  relative
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-slate-200
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-orange-400
                  hover:bg-orange-50
                "
              >
                <FiHeart
  size={20}
  className={wishlistCount > 0 ? "text-red-500" : ""}
/>

                {wishlistCount > 0 && (
  <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
    {wishlistCount}
  </span>
)}
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="
                  relative
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-slate-200
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-orange-400
                  hover:bg-orange-50
                "
              >
                <FiShoppingCart size={20} />

                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#102B52] px-1 text-[10px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Profile */}
            <ProfileMenu />

              {/* Mobile Menu */}
              <button
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-slate-200
                  lg:hidden
                "
              >
                <FiMenu size={22} />
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="pb-4 lg:hidden">
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Desktop Menu */}
      <div
        className={`
          border-b
          border-slate-200
          bg-white
          transition-all
          duration-300
          ${scrolled ? "shadow-sm" : ""}
        `}
      >
        <DesktopMenu />
      </div>
    </header>
  );
}