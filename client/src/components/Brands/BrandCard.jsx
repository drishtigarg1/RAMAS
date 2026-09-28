import { Link } from "react-router-dom";

export default function BrandCard({ brand }) {
  return (
    <Link
      to={`/brand/${brand.name.toLowerCase()}`}
      className="
        group
        flex
        h-36
        flex-col
        items-center
        justify-center
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-orange-400
        hover:shadow-xl
      "
    >
      <img
        src={brand.logo}
        alt={brand.name}
        className="
          h-14
          object-contain
          transition-transform
          duration-300
          group-hover:scale-110
        "
      />

      <p className="mt-4 text-sm font-semibold text-slate-700 group-hover:text-orange-500">
        {brand.name}
      </p>
    </Link>
  );
}