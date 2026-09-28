import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiChevronRight,
  FiStar,
} from "react-icons/fi";

import MegaColumn from "./MegaColumn";

export default function MegaMenu({ menu }) {
  return (
    <div className="mx-auto w-full max-w-[1320px]">

      <div
        className="
          overflow-hidden
          rounded-3xl
          border
          border-slate-200/80
          bg-white/95
          backdrop-blur-xl
          shadow-[0_30px_80px_rgba(15,23,42,0.18)]
        "
      >
        <div className="flex min-h-[520px]">

          {/* LEFT */}

          <div className="flex-1 p-10">

            <div className="mb-10 flex items-start justify-between">

              <div>

                <div className="flex items-center gap-2">

                  <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-[3px] text-orange-600">
                    Explore
                  </span>

                  <span className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                    <FiStar size={12} />
                    Featured
                  </span>

                </div>

                <h2 className="mt-5 text-4xl font-black text-[#102B52]">
                  {menu.title}
                </h2>

                <p className="mt-4 max-w-2xl text-[15px] leading-7 text-slate-500">
                  Browse our premium collection of
                  {` ${menu.title.toLowerCase()} `}
                  products carefully selected for
                  students, professionals and institutions.
                </p>

              </div>

              <Link
                to={`/category/${menu.slug}`}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-orange-300
                  px-6
                  py-3
                  font-semibold
                  text-orange-600
                  transition-all
                  duration-300
                  hover:bg-orange-500
                  hover:text-white
                "
              >
                View All

                <FiArrowRight />
              </Link>

            </div>

            {menu.columns?.length ? (

              <div className="grid grid-cols-5 gap-10">

                {menu.columns.map((column) => (
                  <MegaColumn
                    key={column.title}
                    categorySlug={menu.slug}
                    column={column}
                  />
                ))}

              </div>

            ) : (

              <div className="flex h-[300px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50">

                <div className="text-center">

                  <h3 className="text-2xl font-bold text-[#102B52]">
                    Coming Soon
                  </h3>

                  <p className="mt-2 text-slate-500">
                    We are adding products to this category.
                  </p>

                </div>

              </div>

            )}

          </div>

          {/* RIGHT PANEL */}

          <aside
            className="
              flex
              w-[340px]
              flex-col
              justify-between
              bg-gradient-to-br
              from-[#102B52]
              via-[#17417A]
              to-[#2B66C4]
              p-8
              text-white
            "
          >

            <div>

              <div className="overflow-hidden rounded-2xl">

                <img
                  src={menu.banner}
                  alt={menu.title}
                  className="
                    h-60
                    w-full
                    object-cover
                    transition-all
                    duration-500
                    hover:scale-105
                  "
                />

              </div>

              <h3 className="mt-8 text-3xl font-bold">
                {menu.title}
              </h3>

              <p className="mt-4 leading-7 text-blue-100">
                Premium quality products trusted by
                thousands of schools, colleges,
                offices and professionals.
              </p>

            </div>

            <div className="space-y-3">

              <Link
                to={`/category/${menu.slug}`}
                className="
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  bg-orange-500
                  px-5
                  py-4
                  font-semibold
                  transition-all
                  duration-300
                  hover:bg-orange-600
                "
              >
                Shop Collection

                <FiChevronRight />
              </Link>

              <button
                className="
                  w-full
                  rounded-xl
                  border
                  border-white/20
                  py-4
                  font-medium
                  transition
                  hover:bg-white/10
                "
              >
                View Best Sellers
              </button>

            </div>

          </aside>

        </div>

      </div>

    </div>
  );
}