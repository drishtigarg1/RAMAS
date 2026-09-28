import { Outlet } from "react-router-dom";
import AuthBanner from "../components/Auth/AuthBanner";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid w-full overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-2">

          {/* Left Branding Panel */}
          <AuthBanner />

          {/* Right Form Section */}
          <div className="flex items-center justify-center p-6 sm:p-10 lg:p-14">
            <div className="w-full max-w-md">
              <Outlet />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}