import clsx from "clsx";

export default function Badge({
    children,
    variant = "primary",
    size = "md",
}) {

    const variants = {

        primary:
            "bg-blue-100 text-blue-700",

        success:
            "bg-green-100 text-green-700",

        warning:
            "bg-yellow-100 text-yellow-700",

        danger:
            "bg-red-100 text-red-700",

        gray:
            "bg-slate-100 text-slate-700",

    };

    const sizes = {

        sm:
            "px-2 py-1 text-xs",

        md:
            "px-3 py-1 text-sm",

    };

    return (

        <span
            className={clsx(
                "inline-flex rounded-full font-semibold",
                variants[variant],
                sizes[size]
            )}
        >

            {children}

        </span>

    );

}