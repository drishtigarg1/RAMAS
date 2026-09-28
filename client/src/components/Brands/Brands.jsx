import Container from "../Common/Container";
import { SectionHeading } from "../UI";

import BrandCard from "./BrandCard";
import brands from "./brandData";

export default function Brands() {
  return (
    <section className="section bg-slate-50">
      <Container>
        <SectionHeading
          badge="Trusted Brands"
          title="Shop by Brand"
          description="Explore products from India's most trusted stationery and sports brands."
        />

        <div className="mt-12 grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8">
          {brands.map((brand) => (
            <BrandCard
              key={brand.id}
              brand={brand}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}