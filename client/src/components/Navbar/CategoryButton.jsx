import { FiGrid } from "react-icons/fi";

export default function CategoryButton() {
  return (
    <button
      className="
      flex
      items-center
      gap-3
      rounded-xl
      bg-orange-500
      px-5
      py-3
      text-white
      font-semibold
      shadow-md
      transition-all
      duration-300
      hover:bg-orange-600
      hover:shadow-lg
      active:scale-95
    "
    >
      <FiGrid size={18} />

      Categories
    </button>
  );
}