import { Link } from "react-router-dom";
import {
  FiBookOpen,
  FiBriefcase,
  FiActivity,
  FiArrowRight,
  FiStar,
} from "react-icons/fi";

const cards = [
  {
    icon: FiBookOpen,
    title: "School Essentials",
    desc: "Notebooks, Pens, Backpacks & More",
    badge: "Up to 30% OFF",
    link: "/category/school",
    color: "from-blue-50 to-blue-100",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: FiBriefcase,
    title: "Office Supplies",
    desc: "Files, Printers & Productivity Tools",
    badge: "New Collection",
    link: "/category/office",
    color: "from-orange-50 to-orange-100",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    icon: FiActivity,
    title: "Sports Collection",
    desc: "Indoor & Outdoor Sports Equipment",
    badge: "Best Seller",
    link: "/category/sports",
    color: "from-green-50 to-green-100",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
];

export default function HeroCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Link
            key={card.title}
            to={card.link}
            className={`
              group
              relative
              overflow-hidden
              rounded-3xl
              border
              border-slate-200
              bg-gradient-to-br
              ${card.color}
              p-6
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-2
              hover:shadow-xl
            `}
          >
            {/* Glow */}
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/50 blur-2xl" />

            {/* Badge */}
            <div className="absolute right-5 top-5">
              <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-orange-600 shadow">
                <FiStar size={11} />
                {card.badge}
              </span>
            </div>

            {/* Icon */}
            <div
              className={`
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                ${card.iconBg}
                transition-all
                duration-300
                group-hover:scale-110
                group-hover:rotate-6
              `}
            >
              <Icon
                size={30}
                className={card.iconColor}
              />
            </div>

            {/* Content */}
            <h3 className="mt-6 text-2xl font-bold text-[#102B52]">
              {card.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              {card.desc}
            </p>

            <div
              className="
                mt-6
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-white
                px-5
                py-2
                text-sm
                font-semibold
                text-orange-500
                shadow
                transition-all
                group-hover:bg-orange-500
                group-hover:text-white
              "
            >
              Shop Now

              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        );
      })}
    </div>
  );
}