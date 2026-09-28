import {
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiCheckCircle,
} from "react-icons/fi";

const features = [
  {
    icon: <FiTruck size={28} />,
    title: "Fast Delivery",
    description:
      "Quick and reliable delivery across India.",
  },
  {
    icon: <FiShield size={28} />,
    title: "100% Genuine Products",
    description:
      "All products are sourced from trusted brands.",
  },
  {
    icon: <FiRefreshCw size={28} />,
    title: "Easy Returns",
    description:
      "Simple return and replacement process.",
  },
  {
    icon: <FiCheckCircle size={28} />,
    title: "GST Invoice",
    description:
      "Suitable for schools, colleges and offices.",
  },
];

export default function ProductFeatures() {
  return (
    <section className="mt-20">

      <h2 className="text-3xl font-black text-[#102B52] mb-10">
        Why Buy From Rama Stationers & Sports?
      </h2>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-lg transition"
          >

            <div className="text-orange-500">
              {feature.icon}
            </div>

            <h3 className="mt-5 text-xl font-bold">
              {feature.title}
            </h3>

            <p className="mt-3 text-slate-600 leading-7">
              {feature.description}
            </p>

          </div>
        ))}

      </div>

    </section>
  );
}