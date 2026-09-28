import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link
      to="/"
      className="group flex flex-col flex-shrink-0"
    >
      <span
        className="
          text-3xl
          lg:text-4xl
          font-black
          tracking-tight
          text-[#102B52]
          transition-all
          duration-300
          group-hover:text-orange-500
        "
      >
        RAMA
      </span>

      <span
        className="
          mt-1
          text-[11px]
          uppercase
          tracking-[4px]
          text-orange-500
          font-semibold
        "
      >
        Stationers & Sports
      </span>
    </Link>
  );
}