import {
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiHeadphones,
} from "react-icons/fi";

const features = [
  {
    icon: FiTruck,
    title: "Free Delivery",
    description: "Free shipping on eligible orders.",
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    icon: FiShield,
    title: "100% Genuine",
    description: "Trusted brands with quality assurance.",
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    icon: FiRefreshCw,
    title: "Easy Returns",
    description: "7-day hassle-free returns & replacements.",
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
  {
    icon: FiHeadphones,
    title: "24×7 Support",
    description: "We're always here to help you.",
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
];

export default function HeroFeatures() {
  return (
    <section className="mt-10">
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-slate-200
                bg-gradient-to-br
                from-white
                to-slate-50
                p-6
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-orange-200
                hover:shadow-xl
              "
            >
              {/* Hover Accent */}
              <div
                className="
                  absolute
                  left-0
                  top-0
                  h-1
                  w-0
                  bg-orange-500
                  transition-all
                  duration-300
                  group-hover:w-full
                "
              />

              {/* Icon */}
              <div
                className={`
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  ${feature.bg}
                  transition-all
                  duration-300
                  group-hover:scale-110
                  group-hover:rotate-6
                `}
              >
                <Icon
                  size={30}
                  className={feature.color}
                />
              </div>

              {/* Title */}
              <h3 className="mt-6 text-xl font-bold text-slate-900">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}