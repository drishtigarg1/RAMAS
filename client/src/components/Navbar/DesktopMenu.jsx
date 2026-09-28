import { useEffect, useRef, useState } from "react";

import navigation from "../../data/navigation";

import CategoryButton from "./CategoryButton";
import MenuItem from "./MenuItem";
import MegaMenu from "./MegaMenu";

export default function DesktopMenu() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const closeTimeout = useRef(null);

  const handleEnter = (menu) => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
    }

    setActiveMenu(menu);
    setIsOpen(true);
  };

  const handleLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setIsOpen(false);
    }, 180);
  };

  useEffect(() => {
    return () => {
      if (closeTimeout.current) {
        clearTimeout(closeTimeout.current);
      }
    };
  }, []);

  return (
    <nav
      className="hidden lg:block bg-white border-b border-slate-200 shadow-sm"
      onMouseLeave={handleLeave}
      onMouseEnter={() => {
        if (closeTimeout.current) {
          clearTimeout(closeTimeout.current);
        }
      }}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

        <div className="relative">

          {/* Navigation */}

          <div className="flex items-center h-16">

            <CategoryButton />

            <div className="ml-8 flex items-center gap-2">

              {navigation.map((menu) => (
                <MenuItem
                  key={menu.id}
                  menu={menu}
                  active={activeMenu?.id === menu.id}
                  onHover={() => handleEnter(menu)}
                />
              ))}

            </div>

          </div>

          {/* Mega Menu */}

          <div
            className={`
              absolute
              left-0
              right-0
              top-full
              pt-3
              transition-all
              duration-300
              ${
                isOpen
                  ? "opacity-100 translate-y-0 visible"
                  : "opacity-0 -translate-y-3 invisible"
              }
            `}
          >
            {activeMenu && (
              <MegaMenu menu={activeMenu} />
            )}
          </div>

        </div>

      </div>
    </nav>
  );
}