export default function SectionHeading({
  badge,
  title,
  description,
  action,
}) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
      <div>
        {badge && (
          <span className="uppercase tracking-[3px] text-sm font-semibold text-[#FF6B00]">
            {badge}
          </span>
        )}

        <h2 className="mt-2 text-4xl lg:text-5xl font-black text-[#102B52]">
          {title}
        </h2>

        {description && (
          <p className="mt-4 max-w-2xl text-slate-500">
            {description}
          </p>
        )}
      </div>

      {action}
    </div>
  );
}