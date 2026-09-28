import { useEffect, useMemo, useRef, useState } from "react";
import {
  FiSearch,
  FiX,
} from "react-icons/fi";

import SearchSuggestions from "./SearchSuggestions";
import products from "../../data/products";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    const handleShortcut = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleShortcut);

    return () =>
      window.removeEventListener("keydown", handleShortcut);
  }, []);

  const suggestions = useMemo(() => {
    if (!search.trim()) return [];

    return products
      .filter((product) =>
        product.name
          .toLowerCase()
          .includes(search.toLowerCase())
      )
      .slice(0, 8);
  }, [search]);

  return (
    <div className="relative w-full">

      <div
        className="
          group
          relative
        "
      >
        {/* Search Icon */}

        <FiSearch
          size={20}
          className="
            absolute
            left-5
            top-1/2
            -translate-y-1/2
            text-slate-400
            transition-all
            group-focus-within:text-orange-500
          "
        />

        {/* Input */}

        <input
          ref={inputRef}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search notebooks, pens, sports, books..."
          className="
            h-14
            w-full
            rounded-full
            border
            border-slate-300
            bg-white
            pl-14
            pr-44
            text-[15px]
            outline-none

            transition-all
            duration-300

            placeholder:text-slate-400

            shadow-sm

            focus:border-orange-500
            focus:ring-4
            focus:ring-orange-100
            focus:shadow-lg
          "
        />

        {/* Ctrl + K */}

        {!search && (
          <div
            className="
              absolute
              right-28
              top-1/2
              hidden
              -translate-y-1/2
              rounded-md
              border
              bg-slate-50
              px-2
              py-1
              text-xs
              text-slate-500
              lg:flex
            "
          >
            Ctrl K
          </div>
        )}

        {/* Clear */}

        {search && (
          <button
            onClick={() => setSearch("")}
            className="
              absolute
              right-28
              top-1/2
              -translate-y-1/2
              rounded-full
              p-1
              text-slate-500
              hover:bg-slate-100
            "
          >
            <FiX size={18} />
          </button>
        )}

        {/* Search Button */}

        <button
          className="
            absolute
            right-2
            top-2

            flex
            h-10
            items-center
            gap-2

            rounded-full
            bg-orange-500
            px-6

            font-medium
            text-white

            transition-all
            duration-300

            hover:bg-orange-600
            hover:shadow-lg
            active:scale-95
          "
        >
          <span className="hidden sm:block">
            Search
          </span>

          <FiSearch className="sm:hidden" />
        </button>
      </div>

      <SearchSuggestions
        search={search}
        suggestions={suggestions}
        closeSuggestions={() => setSearch("")}
      />

    </div>
  );
}