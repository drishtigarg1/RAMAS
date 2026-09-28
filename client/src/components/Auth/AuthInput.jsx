export default function AuthInput({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required = false,
  icon,
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-700">
        {label}
        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}

        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`
            w-full rounded-xl border
            bg-white
            py-3
            pr-4
            ${icon ? "pl-12" : "px-4"}
            transition
            duration-200
            focus:border-[#102B52]
            focus:ring-4
            focus:ring-[#102B52]/10
            ${
              error
                ? "border-red-500"
                : "border-slate-300"
            }
          `}
        />
      </div>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}