import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import authApi from "../api/authApi";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    if (password.length < 8 || password !== confirm) {
      setMessage("Use at least 8 characters and make both passwords match.");
      return;
    }
    try {
      const { data } = await authApi.resetPassword({ token: params.get("token"), password });
      setMessage(data.message);
      setDone(true);
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to reset password.");
    }
  };

  return <div className="mx-auto max-w-md py-16 px-4">
    <h1 className="text-3xl font-bold text-[#102B52]">Reset Password</h1>
    {!done && <form onSubmit={submit} className="mt-8 space-y-4">
      <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New password" className="w-full rounded-lg border p-3" />
      <input type="password" required value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Confirm new password" className="w-full rounded-lg border p-3" />
      <button className="w-full rounded-lg bg-[#102B52] p-3 font-semibold text-white">Reset Password</button>
    </form>}
    {message && <p className="mt-4 text-sm text-slate-600">{message}</p>}
    {done && <Link to="/login" className="mt-6 block text-sm text-orange-600">Go to login</Link>}
  </div>;
}
