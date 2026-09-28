import clsx from "clsx";

export default function Input({
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    className = "",
    inputClassName = "",
    required = false,
    disabled = false,
    ...props
}) {
    return (
        <div className={clsx("space-y-2", className)}>

            {label && (
                <label className="block text-sm font-semibold text-slate-700">
                    {label}

                    {required && (
                        <span className="text-red-500 ml-1">*</span>
                    )}
                </label>
            )}

            <div
                className={clsx(
                    "flex items-center rounded-xl border bg-white transition-all duration-200",
                    error
                        ? "border-red-500 focus-within:ring-2 focus-within:ring-red-200"
                        : "border-slate-300 focus-within:border-[#102B52] focus-within:ring-2 focus-within:ring-blue-100",
                    disabled && "bg-slate-100 cursor-not-allowed"
                )}
            >

                {leftIcon && (
                    <div className="pl-4 text-slate-400">
                        {leftIcon}
                    </div>
                )}

                <input
                    className={clsx(
                        "w-full bg-transparent px-4 py-3 outline-none",
                        inputClassName
                    )}
                    disabled={disabled}
                    {...props}
                />

                {rightIcon && (
                    <div className="pr-4">
                        {rightIcon}
                    </div>
                )}

            </div>

            {error ? (
                <p className="text-sm text-red-600">
                    {error}
                </p>
            ) : helperText ? (
                <p className="text-sm text-slate-500">
                    {helperText}
                </p>
            ) : null}

        </div>
    );
}