import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiHome } from "react-icons/fi";

export default function PageNavigation({
  title,
  showBack = true,
  showHome = true,
}) {
  const navigate = useNavigate();

  return (
    <div className="mb-8 flex items-center justify-between">

      {/* Left */}
      <div className="flex items-center gap-3">

        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 shadow-sm transition-all hover:border-orange-500 hover:bg-orange-50"
          >
            <FiArrowLeft className="text-lg" />
            <span className="font-medium">
              Back
            </span>
          </button>
        )}

      </div>

      {/* Title */}
      {title && (
        <h1 className="text-2xl font-bold text-gray-800">
          {title}
        </h1>
      )}

      {/* Right */}
      <div>

        {showHome && (
          <Link
            to="/"
            className="flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2 font-medium text-white shadow-md transition-all hover:bg-orange-600"
          >
            <FiHome className="text-lg" />
            Home
          </Link>
        )}

      </div>

    </div>
  );
}