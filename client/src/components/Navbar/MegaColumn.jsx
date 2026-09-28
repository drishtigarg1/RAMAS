import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

export default function MegaColumn({ categorySlug, column }) {
  return (
    <div>

      {/* Column Heading */}
      <h3
        className="
          mb-5
          border-b
          border-slate-200
          pb-3
          text-lg
          font-bold
          text-[#102B52]
        "
      >
        {column.title}
      </h3>

      {/* Items */}
      <div className="space-y-1">

        {column.items.map((item) => (
          <Link
            key={item.slug}
            to={`/category/${categorySlug}/${item.slug}`}
            className="
              group
              flex
              items-center
              justify-between
              rounded-xl
              px-3
              py-3
              text-sm
              font-medium
              text-slate-600
              transition-all
              duration-300
              hover:bg-orange-50
              hover:text-orange-600
              hover:translate-x-1
            "
          >
            <span>{item.name}</span>

            <FiArrowRight
              size={14}
              className="
                opacity-0
                -translate-x-2
                transition-all
                duration-300
                group-hover:translate-x-0
                group-hover:opacity-100
              "
            />
          </Link>
        ))}

      </div>

      {/* See All */}
      <Link
        to={`/category/${categorySlug}`}
        className="
          mt-5
          inline-flex
          items-center
          gap-2
          text-sm
          font-semibold
          text-orange-500
          transition-all
          duration-300
          hover:gap-3
        "
      >
        See All
        <FiArrowRight size={14} />
      </Link>

    </div>
  );
}