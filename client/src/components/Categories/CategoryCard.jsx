import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

export default function CategoryCard({ category }) {
  const Icon = category.icon;

  return (
    <Link
      to={`/category/${category.slug}`}
      className="
        group
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-xl
      "
    >
      <div
        className={`
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-2xl
          ${category.color}
        `}
      >
        <Icon size={30} />
      </div>

      <h3 className="mt-6 text-xl font-bold text-[#102B52]">
        {category.name}
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        {category.products}
      </p>

      <div className="mt-5 flex items-center text-orange-500 font-semibold">
        Browse

        <FiArrowRight
          className="
            ml-2
            transition-transform
            group-hover:translate-x-1
          "
        />
      </div>
    </Link>
  );
}