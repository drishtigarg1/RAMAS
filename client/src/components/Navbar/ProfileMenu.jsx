import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiUser,
  FiShoppingBag,
  FiHeart,
  FiMapPin,
  FiLogOut,
  FiLogIn,
  FiUserPlus,
  FiSettings,
} from "react-icons/fi";

import { useAuth } from "../../context/AuthContext";

export default function ProfileMenu() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Menu as="div" className="relative hidden sm:block">

      <Menu.Button
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-full
          border
          border-slate-200
          hover:border-orange-400
          hover:bg-orange-50
          transition
        "
      >
        {isAuthenticated ? (
          <span className="font-bold text-[#102B52]">
            {user?.name?.charAt(0).toUpperCase()}
          </span>
        ) : (
          <FiUser size={20} />
        )}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition duration-150"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition duration-100"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >

        <Menu.Items
          className="
            absolute
            right-0
            mt-3
            w-72
            origin-top-right
            rounded-2xl
            bg-white
            shadow-2xl
            ring-1
            ring-black/5
            focus:outline-none
            overflow-hidden
            z-50
          "
        >

          {isAuthenticated ? (
            <>
              <div className="border-b p-5">

                <h3 className="font-bold text-lg">
                  {user?.name}
                </h3>

                <p className="text-sm text-slate-500">
                  {user?.email}
                </p>

              </div>

              <Menu.Item>
                <Link
                  to="/account/profile"
                  className="flex items-center gap-3 px-5 py-3 hover:bg-slate-100"
                >
                  <FiUser />
                  My Profile
                </Link>
              </Menu.Item>

              <Menu.Item>
                <Link
                  to="/account/orders"
                  className="flex items-center gap-3 px-5 py-3 hover:bg-slate-100"
                >
                  <FiShoppingBag />
                  My Orders
                </Link>
              </Menu.Item>

              <Menu.Item>
                <Link
                  to="/wishlist"
                  className="flex items-center gap-3 px-5 py-3 hover:bg-slate-100"
                >
                  <FiHeart />
                  Wishlist
                </Link>
              </Menu.Item>

              <Menu.Item>
                <Link
                  to="/account/addresses"
                  className="flex items-center gap-3 px-5 py-3 hover:bg-slate-100"
                >
                  <FiMapPin />
                  Addresses
                </Link>
              </Menu.Item>

              {user?.role === 'admin' && (
                <Menu.Item>
                  <Link
                    to="/admin/dashboard"
                    className="flex items-center gap-3 px-5 py-3 hover:bg-slate-100 font-semibold text-blue-600"
                  >
                    <FiSettings />
                    Admin Panel
                  </Link>
                </Menu.Item>
              )}

              <div className="border-t">

                <button
                  onClick={handleLogout}
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    px-5
                    py-3
                    text-red-600
                    hover:bg-red-50
                  "
                >
                  <FiLogOut />
                  Logout
                </button>

              </div>
            </>
          ) : (
            <>
              <div className="p-5 border-b">

                <h3 className="font-bold">
                  Welcome 👋
                </h3>

                <p className="text-sm text-slate-500">
                  Login to access your account.
                </p>

              </div>

              <Menu.Item>
                <Link
                  to="/login"
                  className="flex items-center gap-3 px-5 py-3 hover:bg-slate-100"
                >
                  <FiLogIn />
                  Login
                </Link>
              </Menu.Item>

              <Menu.Item>
                <Link
                  to="/register"
                  className="flex items-center gap-3 px-5 py-3 hover:bg-slate-100"
                >
                  <FiUserPlus />
                  Register
                </Link>
              </Menu.Item>
            </>
          )}

        </Menu.Items>

      </Transition>

    </Menu>
  );
}