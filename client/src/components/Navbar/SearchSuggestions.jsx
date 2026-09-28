import { Link } from "react-router-dom";

export default function SearchSuggestions({
  search,
  suggestions,
  closeSuggestions,
}) {
  if (!search || suggestions.length === 0) return null;

  return (
    <div className="absolute left-0 right-0 top-[58px] bg-white rounded-xl shadow-2xl border z-50 overflow-hidden">

      {suggestions.map((item) => (
        <Link
          key={item.slug}
          to={`/product/${item.slug}`}
          onClick={closeSuggestions}
          className="flex items-center gap-4 px-5 py-4 hover:bg-orange-50 transition"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-12 h-12 rounded object-cover"
          />

          <div className="flex-1">

            <h4 className="font-semibold text-gray-800">
              {item.name}
            </h4>

            <p className="text-sm text-gray-500">
              {item.category}
            </p>

          </div>

          <span className="font-bold text-orange-500">
            ₹{item.price}
          </span>

        </Link>
      ))}

    </div>
  );
}