import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";
import toast from "react-hot-toast";
import { FiUpload, FiX } from "react-icons/fi";

export default function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAdd = id === "add";

  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    countInStock: 0,
    category: "",
    brand: "",
    images: [],
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!isAdd) {
      const fetchProduct = async () => {
        try {
          const { data } = await api.get(`/products/${id}`);
          setFormData({
            name: data.name,
            price: data.price,
            description: data.description,
            countInStock: data.countInStock,
            category: data.category?._id || data.category || "",
            brand: data.brand?._id || data.brand || "",
            images: data.images || [],
          });
        } catch (error) {
          toast.error("Failed to load product");
        }
      };
      fetchProduct();
    }
  }, [id, isAdd]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const uploadData = new FormData();
    uploadData.append("image", file);
    setUploading(true);

    try {
      const { data } = await api.post("/upload", uploadData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, { url: data.imageUrl, public_id: data.publicId }],
      }));
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (isAdd) {
        await api.post("/products", formData);
        toast.success("Product created");
      } else {
        await api.put(`/products/${id}`, formData);
        toast.success("Product updated");
      }
      navigate("/admin/products");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save product");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-slate-200">
      <h1 className="text-2xl font-bold mb-6">{isAdd ? "Add Product" : "Edit Product"}</h1>
      
      <form onSubmit={submitHandler} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Price (₹)</label>
            <input type="number" required value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Stock</label>
            <input type="number" required value={formData.countInStock} onChange={(e) => setFormData({...formData, countInStock: e.target.value})} className="w-full p-2 border rounded" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea rows="4" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Images (Cloudinary)</label>
          <input type="file" onChange={uploadFileHandler} className="w-full p-2 border rounded bg-slate-50" />
          {uploading && <p className="text-sm text-blue-500 mt-1">Uploading...</p>}
          
          <div className="flex gap-2 mt-4 flex-wrap">
            {formData.images.map((img, i) => (
              <div key={i} className="relative">
                <img src={img.url} alt="product preview" className="w-24 h-24 object-cover rounded border" />
                <button type="button" onClick={() => setFormData({...formData, images: formData.images.filter((_, index) => index !== i)})} className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:text-red-500">
                  <FiX size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="w-full bg-[#102B52] text-white py-3 rounded-lg font-semibold hover:bg-blue-900 transition">
          {isAdd ? "Create Product" : "Update Product"}
        </button>
      </form>
    </div>
  );
}
