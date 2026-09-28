import products from "../../data/products";
import ProductCard from "../Products/ProductCard";

export default function RelatedProducts({ product }) {
  const relatedProducts = products
    .filter(
      (item) =>
        item.category === product.category &&
        item._id !== product._id
    )
    .slice(0, 4);

  if (relatedProducts.length === 0) return null;

  return (
    <section className="mt-20">
      <div className="flex items-center justify-between mb-8">

        <div>
          <h2 className="text-3xl font-black text-[#102B52]">
            You May Also Like
          </h2>

          <p className="mt-2 text-slate-500">
            Similar products you may be interested in.
          </p>
        </div>

      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {relatedProducts.map((item) => (
          <ProductCard
            key={item._id}
            product={item}
          />
        ))}
      </div>
    </section>
  );
}