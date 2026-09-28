import { useState } from "react";

export default function ProductGallery({ product }) {
  const [selectedImage, setSelectedImage] = useState(
    product.images[0]
  );

  return (
    <div className="grid grid-cols-[90px_1fr] gap-5">
      <div className="space-y-3">
        {product.images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(img)}
            className={`overflow-hidden rounded-xl border-2 transition ${
              selectedImage === img
                ? "border-orange-500"
                : "border-slate-200"
            }`}
          >
            <img
              src={img}
              alt={product.name}
              className="h-20 w-20 object-cover"
            />
          </button>
        ))}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <img
          src={selectedImage}
          alt={product.name}
          className="h-[500px] w-full object-contain transition duration-300 hover:scale-105"
        />
      </div>
    </div>
  );
}