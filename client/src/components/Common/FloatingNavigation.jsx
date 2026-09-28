import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiHome } from "react-icons/fi";

export default function FloatingNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide on Home Page
  if (location.pathname === "/") return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-white text-gray-700 shadow-xl transition-all duration-300 hover:scale-110 hover:bg-orange-500 hover:text-white"
        title="Go Back"
      >
        <FiArrowLeft size={22} />
      </button>

      {/* Home Button */}
      <Link
        to="/"
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white shadow-xl transition-all duration-300 hover:scale-110 hover:bg-orange-600"
        title="Home"
      >
        <FiHome size={22} />
      </Link>

    </div>
  );
}