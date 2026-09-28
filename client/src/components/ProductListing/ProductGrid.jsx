import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../../api/api";
import ProductCard from "../Products/ProductCard";
import ListProductCard from "./ListProductCard";
import EmptyState from "./EmptyState";

export default function ProductGrid({ view = "grid", defaultParams = {} }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams(location.search);
        
        // Append default parameters (e.g. category slug from route)
        Object.keys(defaultParams).forEach(key => {
          if (!queryParams.has(key)) {
            queryParams.append(key, defaultParams[key]);
          }
        });

        const { data } = await api.get(`/products?${queryParams.toString()}`);
        setProducts(data.products || []);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [location.search]);

  if (loading) {
    return <div className="text-center py-10">Loading products...</div>;
  }

  if (!products.length) {
    return <EmptyState />;
  }

  if (view === "list") {
    return (
      <div className="space-y-6">
        {products.map((product) => (
          <ListProductCard key={product._id} product={product} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}