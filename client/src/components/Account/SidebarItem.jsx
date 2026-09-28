import { NavLink } from "react-router-dom";

export default function SidebarItem({
    to,
    icon,
    label,
    danger = false,
}) {

    return (
        <NavLink
            to={to}
            className={({ isActive }) => `
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                transition-all

                ${
                    isActive
                        ? "bg-[#102B52] text-white"
                        : danger
                        ? "text-red-600 hover:bg-red-50"
                        : "hover:bg-slate-100 text-slate-700"
                }
            `}
        >
            <span className="text-lg">
                {icon}
            </span>

            <span className="font-medium">
                {label}
            </span>
        </NavLink>
    );
}