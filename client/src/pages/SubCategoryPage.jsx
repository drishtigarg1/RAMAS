import { useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../components/Common/Container";
import FilterSidebar from "../components/ProductListing/FilterSidebar";
import ProductToolbar from "../components/ProductListing/ProductToolbar";
import ProductGrid from "../components/ProductListing/ProductGrid";

export default function SubCategoryPage() {
  const [view, setView] = useState("grid");
  const { categorySlug, subCategorySlug } = useParams();

  return (
    <main className="min-h-screen bg-slate-50 py-10">
      <Container>
        {/* Breadcrumb */}
        <nav className="mb-3 text-sm text-slate-500">
          Home / {categorySlug.replace("-", " ")} / {subCategorySlug.replace("-", " ")}
        </nav>

        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-[#102B52] capitalize">
            {subCategorySlug.replace("-", " ")}
          </h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="hidden lg:block">
            <FilterSidebar />
          </aside>
          <section>
            <ProductToolbar view={view} onViewChange={setView} />
            <div className="mt-8">
              <ProductGrid view={view} defaultParams={{ category: categorySlug, subCategory: subCategorySlug }} />
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
}