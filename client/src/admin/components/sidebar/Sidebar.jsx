import { Link, useLocation } from "react-router-dom";
import { FiHome, FiBox, FiShoppingCart, FiMail, FiX } from "react-icons/fi";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FiHome /> },
    { name: "Products", path: "/admin/products", icon: <FiBox /> },
    { name: "Orders", path: "/admin/orders", icon: <FiShoppingCart /> },
    { name: "Messages", path: "/admin/messages", icon: <FiMail /> },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200">
          <span className="text-xl font-bold text-[#102B52]">Rama Admin</span>
          <button className="lg:hidden text-slate-500" onClick={() => setSidebarOpen(false)}>
            <FiX size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {links.map((link) => {
            const isActive = location.pathname.startsWith(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-[#102B52] text-white"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span className="mr-3 text-lg">{link.icon}</span>
                <span className="font-medium">{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
