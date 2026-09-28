import Container from "../Common/Container";
import { SectionHeading } from "../UI";

import Countdown from "./Countdown";
import ProductCard from "../Products/ProductCard";
import flashSaleProducts from "./flashSaleData";

export default function FlashSale() {
  return (
    <section className="section bg-white">
      <Container>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

          <SectionHeading
            badge="Limited Time"
            title="Flash Sale"
            description="Grab today's best offers before they're gone."
          />

          <Countdown />

        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {flashSaleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>

      </Container>
    </section>
  );
}