import { FiArrowUp } from "react-icons/fi";

export default function FooterBottom() {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="border-t border-blue-800">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">

        <p className="text-gray-400 text-center md:text-left">
          © {new Date().getFullYear()} Rama Stationers & Sports. All rights reserved.
        </p>

        <button
          onClick={scrollTop}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 transition px-5 py-2 rounded-lg font-medium"
        >
          <FiArrowUp />
          Back to Top
        </button>

      </div>
    </div>
  );
}