import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";
import toast from "react-hot-toast";

export default function Checkout() {
  const { cartItems, total, clearCart, shipping, subtotal, gst } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: user?.name || "",
    address: "",
    city: "",
    postalCode: "",
    country: "India",
    phone: user?.phone || "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  useEffect(() => {
    api.get("/addresses").then(({ data }) => {
      setSavedAddresses(data);
      const preferred = data.find((item) => item.isDefault) || data[0];
      if (preferred) {
        setSelectedAddressId(preferred._id);
        setAddress({ fullName: preferred.fullName, address: [preferred.addressLine1, preferred.addressLine2].filter(Boolean).join(", "), city: preferred.city, postalCode: preferred.postalCode, country: preferred.country, phone: preferred.phone });
      }
    }).catch(() => {});
  }, []);

  const selectSavedAddress = (event) => {
    const selected = savedAddresses.find((item) => item._id === event.target.value);
    setSelectedAddressId(event.target.value);
    if (selected) setAddress({ fullName: selected.fullName, address: [selected.addressLine1, selected.addressLine2].filter(Boolean).join(", "), city: selected.city, postalCode: selected.postalCode, country: selected.country, phone: selected.phone });
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        orderItems: cartItems.map((item) => ({
          name: item.name,
          qty: item.quantity,
          image: item.image || (item.images?.[0]?.url),
          price: item.price,
          product: item._id, // Enforce strictly MongoDB _id
        })),
        shippingAddress: address,
        paymentMethod,
        itemsPrice: subtotal,
        taxPrice: gst,
        shippingPrice: shipping,
        totalPrice: total,
      };

      const { data } = await api.post("/orders", orderData);
      
      toast.success("Order placed successfully!");
      clearCart();
      navigate("/orders"); 
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <form onSubmit={placeOrder} className="space-y-6 bg-white p-6 rounded-xl border border-slate-200">
            <h2 className="text-xl font-semibold">Shipping Address</h2>

            {savedAddresses.length > 0 && <div className="border border-orange-100 bg-orange-50 p-4"><label className="block text-sm font-semibold text-slate-700">Deliver to a saved address<select value={selectedAddressId} onChange={selectSavedAddress} className="mt-2 w-full rounded border border-orange-200 bg-white p-2"><option value="">Choose an address</option>{savedAddresses.map((saved) => <option key={saved._id} value={saved._id}>{saved.label} — {saved.addressLine1}, {saved.city}</option>)}</select></label><p className="mt-2 text-xs text-slate-500">Need another place? Enter a new address below, then save it from <a className="font-semibold text-orange-600" href="/account/addresses">Saved addresses</a>.</p></div>}
            
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input type="text" name="fullName" value={address.fullName} onChange={handleChange} required className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input type="text" name="address" value={address.address} onChange={handleChange} required className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input type="text" name="city" value={address.city} onChange={handleChange} required className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Postal Code</label>
                <input type="text" name="postalCode" value={address.postalCode} onChange={handleChange} required className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input type="text" name="phone" value={address.phone} onChange={handleChange} required className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <h2 className="text-xl font-semibold pt-4 border-t">Payment Method</h2>
            <div>
              <label className="flex items-center space-x-2">
                <input type="radio" value="COD" checked={paymentMethod === "COD"} onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4 text-blue-600" />
                <span>Cash on Delivery (COD)</span>
              </label>
              <label className="flex items-center space-x-2 mt-2">
                <input type="radio" value="Razorpay" checked={paymentMethod === "Razorpay"} onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4 text-blue-600" disabled />
                <span className="text-slate-400">Online Payment (Coming Soon)</span>
              </label>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-[#102B52] text-white py-3 rounded-lg font-semibold hover:bg-blue-900 transition mt-6">
              {loading ? "Processing..." : "Place Order"}
            </button>
          </form>
        </div>

        <div>
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 sticky top-28">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item._id} className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <img src={item.image || (item.images?.[0]?.url)} alt={item.name} className="w-12 h-12 rounded object-cover" />
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-600">Subtotal</span>
                <span className="font-medium">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Shipping</span>
                <span className="font-medium">₹{shipping}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">GST (18%)</span>
                <span className="font-medium">₹{gst}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-4">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
