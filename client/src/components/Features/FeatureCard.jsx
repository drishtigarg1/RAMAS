export default function FeatureCard({ feature }) {
  const Icon = feature.icon;

  return (
    <div
      className="
        group
        flex
        items-center
        gap-4
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      <div
        className={`
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          ${feature.color}
        `}
      >
        <Icon size={26} />
      </div>

      <div>
        <h3 className="font-bold text-[#102B52]">
          {feature.title}
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          {feature.description}
        </p>
      </div>
    </div>
  );
}