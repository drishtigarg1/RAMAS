import { FiMenu, FiBell, FiUser } from "react-icons/fi";
import { useAuth } from "../../../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Topbar({ sidebarOpen, setSidebarOpen }) {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8">
      <div className="flex items-center">
        <button
          className="lg:hidden p-2 mr-3 text-slate-600 hover:bg-slate-100 rounded-lg"
          onClick={() => setSidebarOpen(true)}
        >
          <FiMenu size={24} />
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <Link to="/" className="text-sm font-medium text-blue-600 hover:underline">
          Go to Store
        </Link>
        <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
          <FiBell size={20} />
        </button>
        <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
            <FiUser />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-slate-700">{user?.name || "Admin"}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
