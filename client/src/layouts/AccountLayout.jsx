import { Outlet } from "react-router-dom";
import Sidebar from "../components/Account/Sidebar";
import MobileSidebar from "../components/Account/MobileSidebar";

export default function AccountLayout() {
  return (
    <main className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Mobile */}
        <div className="lg:hidden mb-6">
          <MobileSidebar />
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <Sidebar />
          </aside>

          {/* Page Content */}
          <section className="bg-white rounded-2xl shadow-sm p-6 min-h-[700px]">
            <Outlet />
          </section>

        </div>
      </div>
    </main>
  );
}