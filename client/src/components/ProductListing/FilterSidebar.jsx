import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FilterSection from "./FilterSection";
import CheckboxItem from "./CheckboxItem";

// Since categories and brands are now dynamic, ideally we'd fetch them, 
// but for simplicity we'll use a hardcoded list for demonstration or just basic text inputs if missing.
// I'll keep the mock lists to make it look good for now.
import { brands, categories, ratings } from "./filterData";

export default function FilterSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [selectedCategories, setSelectedCategories] = useState(
    searchParams.getAll("category") || []
  );

  useEffect(() => {
    // Sync state to URL when selected changes
    const params = new URLSearchParams();
    if (selectedCategories.length > 0) {
      selectedCategories.forEach(c => params.append("category", c));
    }
    // Update URL without reloading page
    navigate({ search: params.toString() });
  }, [selectedCategories, navigate]);

  const toggleItem = (value, list, setter) => {
    setter(
      list.includes(value)
        ? list.filter((item) => item !== value)
        : [...list, value]
    );
  };

  return (
    <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-8 text-2xl font-bold text-[#102B52]">Filters</h2>

      <div className="space-y-8">
        <FilterSection title="Categories">
          {categories.map((item) => (
            <CheckboxItem
              key={item}
              label={item}
              checked={selectedCategories.includes(item)}
              onChange={() => toggleItem(item, selectedCategories, setSelectedCategories)}
            />
          ))}
        </FilterSection>
      </div>
    </aside>
  );
}