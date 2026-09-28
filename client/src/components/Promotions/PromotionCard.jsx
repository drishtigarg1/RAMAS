export default function PromotionCard({ item }) {
  return (
    <div className="relative rounded-2xl overflow-hidden h-60 shadow-lg group">

      <img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-500"
      />

      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative h-full flex flex-col justify-center p-8 text-white">

        <h2 className="text-3xl font-bold">
          {item.title}
        </h2>

        <p className="mt-3">
          {item.subtitle}
        </p>

        <button
          className={`mt-6 px-6 py-3 rounded-lg w-fit ${item.color}`}
        >
          {item.button}
        </button>

      </div>

    </div>
  );
}