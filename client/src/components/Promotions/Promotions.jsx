import promotions from "../../data/promotions";
import PromotionCard from "./PromotionCard";

export default function Promotions() {
  return (
    <section className="py-16 bg-white">

      <div className="max-w-7xl mx-auto px-4">

        <div className="grid lg:grid-cols-3 gap-8">

          {promotions.map((item) => (
            <PromotionCard
              key={item.id}
              item={item}
            />
          ))}

        </div>

      </div>

    </section>
  );
}