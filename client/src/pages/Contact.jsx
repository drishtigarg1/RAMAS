import { useState } from "react";
import contactApi from "../api/contactApi";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus("");
    try {
      const { data } = await contactApi.create(form);
      setStatus(data.message);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setStatus(error.response?.data?.message || "Unable to send your message.");
    } finally {
      setLoading(false);
    }
  };

  return <div className="mx-auto max-w-3xl px-4 py-16">
    <h1 className="text-4xl font-bold text-[#102B52]">Contact Us</h1>
    <p className="mt-3 text-slate-600">Have a question? Send us a message and our team will respond.</p>
    <form onSubmit={submit} className="mt-8 space-y-4 rounded-2xl border bg-white p-6 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2">
        <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="rounded-lg border p-3" />
        <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email address" className="rounded-lg border p-3" />
      </div>
      <input required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="Subject" className="w-full rounded-lg border p-3" />
      <textarea required maxLength={5000} rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="How can we help?" className="w-full rounded-lg border p-3" />
      <button disabled={loading} className="rounded-lg bg-[#102B52] px-6 py-3 font-semibold text-white">{loading ? "Sending..." : "Send Message"}</button>
      {status && <p className="text-sm text-slate-600">{status}</p>}
    </form>
  </div>;
}
