import clsx from "clsx";

export default function Card({
    children,
    className = "",
    hover = false,
    padding = true,
    shadow = "sm",
}) {

    const shadows = {
        none: "",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
    };

    return (
        <div
            className={clsx(
                "bg-white rounded-2xl border border-slate-200",
                shadows[shadow],
                padding && "p-6",
                hover && "hover:shadow-lg transition-all duration-300",
                className
            )}
        >
            {children}
        </div>
    );
}