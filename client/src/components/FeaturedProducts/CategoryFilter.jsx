export default function CategoryFilter({
  categories,
  activeCategory,
  setActiveCategory,
}) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveCategory(category)}
          className={`
            rounded-full
            px-5
            py-2.5
            text-sm
            font-semibold
            transition-all
            duration-300

            ${
              activeCategory === category
                ? "bg-[#102B52] text-white shadow-lg"
                : "bg-white border border-slate-200 text-slate-700 hover:border-orange-500 hover:text-orange-500"
            }
          `}
        >
          {category}
        </button>
      ))}
    </div>
  );
}