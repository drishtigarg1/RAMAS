import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import FloatingNavigation from "../components/Common/FloatingNavigation";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <Navbar />

      {/* Floating Back & Home Buttons */}
      <FloatingNavigation />

      {/* Space for the fixed navbar */}
      <main className="flex-1 pt-[136px] lg:pt-[150px]">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
