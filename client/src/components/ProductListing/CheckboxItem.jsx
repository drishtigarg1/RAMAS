export default function CheckboxItem({
  label,
  checked,
  onChange,
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between py-2">

      <div className="flex items-center gap-3">

        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="
            h-4
            w-4
            rounded
            border-slate-300
            accent-[#102B52]
          "
        />

        <span className="text-sm text-slate-700">
          {label}
        </span>

      </div>

    </label>
  );
}