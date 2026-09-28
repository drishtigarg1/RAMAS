import { useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../components/Common/Container";
import FilterSidebar from "../components/ProductListing/FilterSidebar";
import ProductToolbar from "../components/ProductListing/ProductToolbar";
import ProductGrid from "../components/ProductListing/ProductGrid";

export default function CategoryPage() {
  const [view, setView] = useState("grid");
  const { categorySlug } = useParams();

  return (
    <main className="min-h-screen bg-slate-50 py-10">
      <Container>
        {/* Breadcrumb */}
        <nav className="mb-3 text-sm text-slate-500">
          Home / Categories / {categorySlug.replace("-", " ")}
        </nav>

        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-[#102B52] capitalize">
            {categorySlug.replace("-", " ")}
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Browse our complete collection for {categorySlug.replace("-", " ")}.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            {/* The filter sidebar can read URL params, but we also pass the category implicitly via the API in ProductGrid by adding category parameter */}
            <FilterSidebar />
          </aside>

          {/* Main Content */}
          <section>
            <ProductToolbar view={view} onViewChange={setView} />
            <div className="mt-8">
              {/* Force the categorySlug as a default query param */}
              <ProductGrid view={view} defaultParams={{ category: categorySlug }} />
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
}