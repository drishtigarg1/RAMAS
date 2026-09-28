export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  const variants = {
    primary:
      "bg-[#FF6B00] hover:bg-orange-600 text-white",

    secondary:
      "bg-[#102B52] hover:bg-[#173b70] text-white",

    outline:
      "border border-slate-300 bg-white hover:border-[#FF6B00] hover:text-[#FF6B00]",

    ghost:
      "hover:bg-slate-100",
  };

  const sizes = {
    sm: "h-10 px-4 text-sm",
    md: "h-12 px-6",
    lg: "h-14 px-8 text-lg",
  };

  return (
    <button
      className={`
        inline-flex
        items-center
        justify-center
        rounded-xl
        font-semibold
        transition-all
        duration-300
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}