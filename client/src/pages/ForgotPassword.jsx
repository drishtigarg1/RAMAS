import { useState } from "react";
import { Link } from "react-router-dom";
import authApi from "../api/authApi";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const { data } = await authApi.forgotPassword({ email });
      setMessage(data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to send reset link.");
    } finally {
      setLoading(false);
    }
  };

  return <div className="mx-auto max-w-md py-16 px-4">
    <h1 className="text-3xl font-bold text-[#102B52]">Forgot Password</h1>
    <p className="mt-2 text-slate-500">Enter your email to receive a reset link.</p>
    <form onSubmit={submit} className="mt-8 space-y-4">
      <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" className="w-full rounded-lg border p-3" />
      <button disabled={loading} className="w-full rounded-lg bg-[#102B52] p-3 font-semibold text-white">{loading ? "Sending..." : "Send Reset Link"}</button>
    </form>
    {message && <p className="mt-4 text-sm text-slate-600">{message}</p>}
    <Link to="/login" className="mt-6 block text-sm text-orange-600">Back to login</Link>
  </div>;
}
