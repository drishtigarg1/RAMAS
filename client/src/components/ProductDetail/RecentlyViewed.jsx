import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function RecentlyViewed({ currentProduct }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("recentProducts")) || [];

    const filtered = saved.filter(
      (item) => item._id !== currentProduct._id
    );

    const updated = [
      currentProduct,
      ...filtered,
    ].slice(0, 8);

    localStorage.setItem(
      "recentProducts",
      JSON.stringify(updated)
    );

    setProducts(updated.slice(1));
  }, [currentProduct]);

  if (products.length === 0) return null;

  return (
    <section className="mt-14">
      <h2 className="mb-6 text-2xl font-bold text-[#102B52]">
        Recently Viewed
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

        {products.map((product) => (
          <Link
            key={product._id}
            to={`/product/${product.slug}`}
            className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >

            <img
              src={product.images?.[0]}
              alt={product.name}
              className="h-48 w-full object-cover"
            />

            <div className="p-4">

              <h3 className="line-clamp-2 font-semibold text-[#102B52]">
                {product.name}
              </h3>

              <p className="mt-2 text-lg font-bold text-orange-600">
                ₹
                {product.discountPrice ??
                  product.price}
              </p>

            </div>

          </Link>
        ))}

      </div>
    </section>
  );
}