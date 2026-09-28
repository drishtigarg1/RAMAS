import ProductGrid from "../Product/ProductGrid";

export default function SectionProducts({
    title,
    subtitle,
    products,
}) {
    return (
        <section className="py-16">

            <div className="max-w-7xl mx-auto px-4">

                <div className="flex justify-between items-center">

                    <div>

                        <h2 className="text-3xl font-bold">
                            {title}
                        </h2>

                        <p className="text-gray-500 mt-2">
                            {subtitle}
                        </p>

                    </div>

                    <button
                        className="text-orange-500 font-semibold"
                    >
                        View All →
                    </button>

                </div>

                <div className="mt-10">

                    <ProductGrid
                        products={products}
                    />

                </div>

            </div>

        </section>
    );
}