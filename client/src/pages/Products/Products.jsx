import { useState } from "react";

import Container from "../../components/Common/Container";
import FilterSidebar from "../../components/ProductListing/FilterSidebar";
import ProductToolbar from "../../components/ProductListing/ProductToolbar";
import ProductGrid from "../../components/ProductListing/ProductGrid";

export default function Products() {
  const [view, setView] = useState("grid");

  return (
    <main className="min-h-screen bg-slate-50 py-10">
      <Container>
        {/* Breadcrumb */}
        <nav className="mb-3 text-sm text-slate-500">
          Home / Products
        </nav>

        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-[#102B52]">
            All Products
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Browse our complete collection of stationery,
            office supplies, school essentials, and sports equipment.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <FilterSidebar />
          </aside>

          {/* Main Content */}
          <section>
            <ProductToolbar
              view={view}
              onViewChange={setView}
            />

            <div className="mt-8">
              <ProductGrid view={view} />
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
}