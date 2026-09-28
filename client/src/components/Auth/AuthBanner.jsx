import { FiBookOpen, FiBriefcase, FiTruck } from "react-icons/fi";

export default function AuthBanner() {
  return (
    <div className="relative hidden overflow-hidden bg-[#102B52] p-12 text-white lg:flex lg:flex-col lg:justify-between">

      <div>
        <h1 className="text-4xl font-extrabold">
          Rama Stationers
        </h1>

        <h2 className="mt-2 text-2xl text-orange-400">
          & Sports
        </h2>

        <p className="mt-8 text-lg leading-8 text-slate-200">
          Your trusted destination for stationery,
          office essentials, school supplies,
          sports equipment and much more.
        </p>
      </div>

      <div className="space-y-6">

        <div className="flex items-center gap-4">
          <FiBookOpen size={28} />
          <span>Premium School Supplies</span>
        </div>

        <div className="flex items-center gap-4">
          <FiBriefcase size={28} />
          <span>Office Essentials</span>
        </div>

        <div className="flex items-center gap-4">
          <FiTruck size={28} />
          <span>Fast & Secure Delivery</span>
        </div>

      </div>

      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
      <div className="absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl" />

    </div>
  );
}