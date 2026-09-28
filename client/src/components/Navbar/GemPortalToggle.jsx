import { useEffect, useRef, useState } from "react";
import {
  FiChevronDown,
  FiExternalLink,
  FiCheckCircle,
  FiPackage,
  FiTruck,
  FiBriefcase,
  FiBookOpen,
} from "react-icons/fi";

export default function GemPortalToggle() {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const services = [
    {
      icon: <FiBookOpen />,
      text: "Stationery Supplies",
    },
    {
      icon: <FiBriefcase />,
      text: "Office Supplies",
    },
    {
      icon: <FiPackage />,
      text: "School Essentials",
    },
    {
      icon: <FiTruck />,
      text: "Sports Equipment",
    },
  ];

  return (
    <div
      className="relative"
      ref={dropdownRef}
    >
      {/* Toggle */}

      <button
        onClick={() => setOpen(!open)}
        className="
          flex
          items-center
          gap-2
          rounded-full
          border
          border-blue-200
          bg-gradient-to-r
          from-blue-50
          to-white
          px-4
          py-2
          transition
          hover:shadow-md
        "
      >
        <img
          src="/gem-logo.jpg"
          alt="GeM"
          className="h-7"
        />

        <div className="text-left leading-tight">

          <p className="text-xs text-slate-500">
            Government
          </p>

          <p className="font-semibold text-[#102B52]">
            GeM Verified
          </p>

        </div>

        <FiChevronDown
          className={`transition ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}

      {open && (
        <div
          className="
            absolute
            right-0
            mt-4
            w-[390px]
            overflow-hidden
            rounded-3xl
            border
            border-slate-200
            bg-white
            shadow-2xl
            z-50
          "
        >
          {/* Header */}

          <div className="bg-gradient-to-r from-[#102B52] to-[#1B4D8A] p-6 text-white">

            <div className="flex items-center gap-4">

              <img
                src="/gem-logo.jpg"
                alt="GeM"
                className="h-14 rounded-xl bg-white p-2"
              />

              <div>

                <h2 className="text-xl font-bold">
                  Government Supplier
                </h2>

                <p className="text-blue-100">
                  Available on GeM Portal
                </p>

              </div>

            </div>

          </div>

          {/* Body */}

          <div className="p-6">

            <div className="rounded-2xl bg-green-50 p-4">

              <div className="flex items-center gap-2">

                <FiCheckCircle className="text-green-600" />

                <p className="font-semibold text-green-700">
                  Verified Business Supplier
                </p>

              </div>

              <p className="mt-2 text-sm text-slate-600">
                We supply quality stationery,
                office products, educational
                materials and sports equipment
                for Government Departments,
                Schools, Colleges, Universities
                and Institutions.
              </p>

            </div>

            <h3 className="mt-6 mb-4 text-lg font-bold text-[#102B52]">
              Services We Offer
            </h3>

            <div className="grid grid-cols-2 gap-3">

              {services.map((service) => (
                <div
                  key={service.text}
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-slate-200
                    p-3
                  "
                >
                  <span className="text-orange-500">
                    {service.icon}
                  </span>

                  <span className="text-sm font-medium">
                    {service.text}
                  </span>

                </div>
              ))}

            </div>

            <div className="mt-6 rounded-2xl bg-orange-50 p-4">

              <p className="font-semibold text-orange-600">
                Bulk Institutional Orders
              </p>

              <p className="mt-2 text-sm text-slate-600">
                Schools • Colleges • Universities •
                Government Offices • Corporate Offices
              </p>

            </div>

            <a
              href="https://gem.gov.in/"
              target="_blank"
              rel="noreferrer"
              className="
                mt-6
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-2xl
                bg-[#102B52]
                py-3
                font-semibold
                text-white
                transition
                hover:bg-orange-500
              "
            >
              Visit GeM Portal

              <FiExternalLink />
            </a>

          </div>

        </div>
      )}
    </div>
  );
}