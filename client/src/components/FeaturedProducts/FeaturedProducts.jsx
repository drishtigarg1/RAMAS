import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import Container from "../Common/Container";
import ProductCard from "../Products/ProductCard";
import { SectionHeading } from "../UI";

import featuredCategories from "./featuredCategories";
import products from "../../data/products";
import CategoryFilter from "./CategoryFilter";

export default function FeaturedProducts() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") {
      return products.slice(0, 8);
    }

    return products.filter(
      (product) => product.category === activeCategory
    );
  }, [activeCategory]);

  return (
    <section className="section bg-slate-50">
      <Container>
        <SectionHeading
          badge="Our Collection"
          title="Featured Products"
          description="Discover our most popular stationery and sports essentials."
        />

        <div className="mt-8">
          <CategoryFilter
            categories={featuredCategories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            to="/products"
            className="
              inline-flex
              items-center
              rounded-xl
              bg-[#102B52]
              px-8
              py-3
              font-semibold
              text-white
              transition
              hover:bg-orange-500
            "
          >
            View All Products
          </Link>
        </div>
      </Container>
    </section>
  );
}