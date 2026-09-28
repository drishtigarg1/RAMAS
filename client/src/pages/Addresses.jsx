import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FiArrowLeft, FiCheck, FiEdit2, FiHome, FiMapPin, FiPlus, FiTrash2 } from "react-icons/fi";
import api from "../api/api";

const emptyAddress = { label: "Home", fullName: "", phone: "", addressLine1: "", addressLine2: "", landmark: "", city: "", state: "", postalCode: "", country: "India", isDefault: false };

export default function Addresses() {
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState(emptyAddress);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadAddresses = async () => {
    try { const { data } = await api.get("/addresses"); setAddresses(data); } finally { setLoading(false); }
  };
  useEffect(() => { loadAddresses(); }, []);
  const change = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const reset = () => { setForm(emptyAddress); setEditingId(null); };
  const submit = async (event) => {
    event.preventDefault(); setSaving(true);
    try {
      const { data } = editingId ? await api.put(`/addresses/${editingId}`, form) : await api.post("/addresses", form);
      setAddresses((current) => editingId ? current.map((address) => address._id === editingId ? data : address) : [data, ...current]);
      toast.success(editingId ? "Address updated" : "Address saved"); reset();
      if (form.isDefault) await loadAddresses();
    } catch (error) { toast.error(error.response?.data?.message || "Could not save address"); } finally { setSaving(false); }
  };
  const edit = (address) => { setEditingId(address._id); setForm({ ...emptyAddress, ...address }); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const remove = async (id) => { if (!window.confirm("Remove this saved address?")) return; try { await api.delete(`/addresses/${id}`); setAddresses((current) => current.filter((address) => address._id !== id)); toast.success("Address removed"); } catch { toast.error("Could not remove address"); } };
  const makeDefault = async (id) => { try { await api.put(`/addresses/${id}/default`); await loadAddresses(); toast.success("Default address updated"); } catch { toast.error("Could not update default address"); } };
  const inputClass = "w-full border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#d15a29]";

  return <div className="min-h-screen bg-[#f8f6f1] px-4 py-10 sm:px-6 lg:px-8"><div className="mx-auto max-w-6xl">
    <Link to="/account" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#102b52]"><FiArrowLeft /> Account</Link>
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="mb-2 text-xs font-bold uppercase tracking-[.16em] text-[#d15a29]">Your places</p><h1 className="font-['Manrope'] text-4xl font-extrabold tracking-[-.05em] text-[#102b52]">Saved addresses</h1><p className="mt-2 text-slate-500">Choose once at checkout. We&apos;ll remember the rest.</p></div><span className="border border-[#ded8ca] bg-white px-3 py-2 text-xs text-slate-500">{addresses.length} saved</span></div>
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      <form onSubmit={submit} className="border border-[#e4dfd4] bg-white p-6 shadow-sm"><div className="mb-5 flex items-center justify-between"><h2 className="text-lg font-bold text-[#102b52]">{editingId ? "Edit address" : "Add an address"}</h2>{editingId && <button type="button" onClick={reset} className="text-xs font-semibold text-[#d15a29]">Cancel</button>}</div><div className="grid gap-4 sm:grid-cols-2">
        <label className="text-xs font-semibold text-slate-600">Save as<select name="label" value={form.label} onChange={change} className={inputClass}><option>Home</option><option>Work</option><option>College</option><option>Office</option><option>Other</option></select></label>
        <label className="text-xs font-semibold text-slate-600">Full name<input name="fullName" required value={form.fullName} onChange={change} className={inputClass} /></label>
        <label className="text-xs font-semibold text-slate-600">Phone<input name="phone" required value={form.phone} onChange={change} className={inputClass} /></label>
        <label className="text-xs font-semibold text-slate-600 sm:col-span-2">Address line 1<input name="addressLine1" required value={form.addressLine1} onChange={change} className={inputClass} /></label>
        <label className="text-xs font-semibold text-slate-600 sm:col-span-2">Address line 2 <span className="font-normal text-slate-400">(optional)</span><input name="addressLine2" value={form.addressLine2} onChange={change} className={inputClass} /></label>
        <label className="text-xs font-semibold text-slate-600">Landmark<input name="landmark" value={form.landmark} onChange={change} className={inputClass} /></label>
        <label className="text-xs font-semibold text-slate-600">City<input name="city" required value={form.city} onChange={change} className={inputClass} /></label>
        <label className="text-xs font-semibold text-slate-600">State<input name="state" required value={form.state} onChange={change} className={inputClass} /></label>
        <label className="text-xs font-semibold text-slate-600">PIN code<input name="postalCode" required maxLength={6} value={form.postalCode} onChange={change} className={inputClass} /></label>
      </div><label className="mt-5 flex items-center gap-2 text-sm text-slate-600"><input type="checkbox" name="isDefault" checked={form.isDefault} onChange={(event) => setForm((current) => ({ ...current, isDefault: event.target.checked }))} /> Make this my default address</label><button disabled={saving} className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-[#102b52] px-4 py-3 text-sm font-bold text-white hover:bg-[#d15a29] disabled:opacity-60"><FiPlus /> {saving ? "Saving…" : editingId ? "Update address" : "Save address"}</button></form>
      <div className="space-y-4">{loading ? <div className="border border-[#e4dfd4] bg-white p-8 text-slate-500">Loading saved addresses…</div> : addresses.length === 0 ? <div className="border border-dashed border-[#d8d0c0] bg-white p-10 text-center"><FiMapPin className="mx-auto mb-3 text-3xl text-[#d15a29]" /><h2 className="font-bold text-[#102b52]">No saved addresses yet</h2><p className="mt-2 text-sm text-slate-500">Add your home or work address to speed up checkout.</p></div> : addresses.map((address) => <div key={address._id} className="border border-[#e4dfd4] bg-white p-5 shadow-sm"><div className="flex items-start justify-between gap-4"><div className="flex gap-3"><div className="grid h-9 w-9 place-items-center bg-[#f5ead9] text-[#d15a29]"><FiHome /></div><div><div className="flex flex-wrap items-center gap-2"><h2 className="font-bold text-[#102b52]">{address.label}</h2>{address.isDefault && <span className="inline-flex items-center gap-1 bg-[#e9f3ed] px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700"><FiCheck /> Default</span>}</div><p className="mt-2 text-sm font-semibold text-slate-700">{address.fullName} · {address.phone}</p><p className="mt-1 text-sm leading-6 text-slate-500">{address.addressLine1}{address.addressLine2 && `, ${address.addressLine2}`}{address.landmark && `, near ${address.landmark}`}<br />{address.city}, {address.state} — {address.postalCode}, {address.country}</p></div></div><div className="flex gap-2"><button type="button" onClick={() => edit(address)} aria-label="Edit address" className="border border-slate-200 p-2 text-slate-500 hover:text-[#d15a29]"><FiEdit2 /></button><button type="button" onClick={() => remove(address._id)} aria-label="Delete address" className="border border-slate-200 p-2 text-slate-500 hover:text-red-600"><FiTrash2 /></button></div></div>{!address.isDefault && <button type="button" onClick={() => makeDefault(address._id)} className="mt-4 text-xs font-bold text-[#d15a29]">Set as default</button>}</div>)}</div>
    </div>
  </div></div>;
}
