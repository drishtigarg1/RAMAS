export default function FilterSection({
  title,
  children,
}) {
  return (
    <div className="border-b border-slate-200 pb-6">

      <h3 className="mb-4 text-lg font-semibold text-[#102B52]">
        {title}
      </h3>

      {children}

    </div>
  );
}