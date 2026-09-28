import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";

export default function Breadcrumbs({
  category,
  productName,
}) {
  return (
    <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
      <Link
        to="/"
        className="hover:text-orange-500 transition"
      >
        Home
      </Link>

      <FiChevronRight size={16} />

      <Link
        to="/products"
        className="hover:text-orange-500 transition"
      >
        Products
      </Link>

      <FiChevronRight size={16} />

      <Link
        to={`/category/${category}`}
        className="capitalize hover:text-orange-500 transition"
      >
        {category.replace("-", " ")}
      </Link>

      <FiChevronRight size={16} />

      <span className="font-medium text-[#102B52]">
        {productName}
      </span>
    </nav>
  );
}