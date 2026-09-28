import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import ProductReviews from "../components/ProductDetail/ProductReviews";
import DeliveryInfo from "../components/ProductDetail/DeliveryInfo";
import Breadcrumbs from "../components/ProductDetail/Breadcrumbs";
import ProductGallery from "../components/ProductDetail/ProductGallery";
import ProductInfo from "../components/ProductDetail/ProductInfo";
import ProductActions from "../components/ProductDetail/ProductActions";
import ProductTabs from "../components/ProductDetail/ProductTabs";
import RelatedProducts from "../components/ProductDetail/RelatedProducts";
import ProductFeatures from "../components/ProductDetail/ProductFeatures";
import RecentlyViewed from "../components/ProductDetail/RecentlyViewed";

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Find product by slug
        const { data } = await api.get(`/products/${slug}`);
        if (data) {
          setProduct(data);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  if (loading) {
    return <div className="max-w-7xl mx-auto py-20 text-center">Loading product...</div>;
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center">
        <h2 className="text-3xl font-bold">Product Not Found</h2>
        <p className="mt-4 text-slate-500">The product you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          category={product.category?.name || "Category"}
          productName={product.name}
        />

        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          {/* We might need to adjust ProductGallery/Info etc to handle the new backend model instead of the mock data structure */}
          <ProductGallery product={product} />

          <div className="space-y-8">
            <ProductInfo product={product} />

            <ProductActions product={product} />
            <DeliveryInfo />
          </div>
        </div>
        <ProductTabs product={product} />
        {/* Skipping these mock components if they crash, but letting them stay if they just display UI */}
      </div>
    </main>
  );
}