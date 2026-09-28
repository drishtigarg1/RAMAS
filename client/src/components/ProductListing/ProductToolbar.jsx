import {
  FiFilter,
  FiGrid,
  FiList,
} from "react-icons/fi";

export default function ProductToolbar() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">

      <div>
        <h3 className="font-semibold text-slate-800">
          Showing
          <span className="mx-1 text-orange-500">
            24
          </span>
          Products
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Explore our latest collection
        </p>
      </div>

      <div className="flex items-center gap-3">

        <button className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 lg:hidden">
          <FiFilter />
          Filters
        </button>

        <select className="rounded-xl border border-slate-200 px-4 py-2.5">
          <option>Newest</option>
          <option>Featured</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Highest Rated</option>
        </select>

        <div className="hidden overflow-hidden rounded-xl border border-slate-200 md:flex">

          <button className="flex h-11 w-11 items-center justify-center bg-[#102B52] text-white">
            <FiGrid />
          </button>

          <button className="flex h-11 w-11 items-center justify-center">
            <FiList />
          </button>

        </div>

      </div>

    </div>
  );
}