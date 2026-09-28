import Container from "../Common/Container";
import CategoryCard from "./CategoryCard";
import categories from "./categoryData";
import { SectionHeading } from "../ui";

export default function Categories() {
  return (
    <section className="section bg-slate-50">
      <Container>

        <SectionHeading
          badge="Categories"
          title="Shop by Category"
          description="Explore everything from school supplies and office essentials to sports equipment, books, electronics, and creative tools."
        />

        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
            />
          ))}
        </div>

      </Container>
    </section>
  );
}