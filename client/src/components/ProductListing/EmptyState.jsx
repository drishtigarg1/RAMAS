import { FiPackage } from "react-icons/fi";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white py-20">

      <FiPackage
        size={60}
        className="text-slate-400"
      />

      <h2 className="mt-6 text-2xl font-bold text-slate-800">
        No Products Found
      </h2>

      <p className="mt-3 max-w-md text-center text-slate-500">
        Try changing your filters or search keyword.
      </p>

    </div>
  );
}