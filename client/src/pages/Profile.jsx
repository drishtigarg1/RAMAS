import { Link } from "react-router-dom";
import { FiArrowRight, FiHeart, FiMapPin, FiPackage, FiSettings, FiUser } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const cards = [
  { title: "Your orders", copy: "Track deliveries, view details and buy again.", href: "/account/orders", icon: FiPackage },
  { title: "Saved addresses", copy: "Keep home, work and college details ready.", href: "/account/addresses", icon: FiMapPin },
  { title: "Wishlist", copy: "Products you want to come back to.", href: "/wishlist", icon: FiHeart },
  { title: "Profile settings", copy: "Update your name, phone and account details.", href: "/profile", icon: FiSettings },
];

export default function Profile() {
  const { user } = useAuth();
  return <div className="min-h-screen bg-[#f8f6f1] px-4 py-10 sm:px-6 lg:px-8"><div className="mx-auto max-w-6xl">
    <section className="relative overflow-hidden bg-[#102b52] px-6 py-10 text-white sm:px-10"><div className="relative z-10"><p className="mb-2 text-xs font-bold uppercase tracking-[.16em] text-[#f1b53c]">Your Rama account</p><h1 className="font-['Manrope'] text-4xl font-extrabold tracking-[-.05em] sm:text-5xl">Welcome back, {user?.name?.split(" ")[0] || "there"}.</h1><p className="mt-3 max-w-xl text-sm leading-6 text-[#c8d6e7]">Keep your essentials together: orders, addresses and the things you want to pick up next.</p></div><div className="absolute -right-12 -top-24 h-72 w-72 rounded-full border border-white/20" /><div className="absolute -right-4 -top-16 h-56 w-56 rounded-full border border-[#f1b53c]/40" /></section>
    <div className="grid gap-4 py-8 sm:grid-cols-2">{cards.map(({ title, copy, href, icon: Icon }) => <Link key={title} to={href} className="group border border-[#e4dfd4] bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"><div className="mb-8 flex items-start justify-between"><span className="grid h-11 w-11 place-items-center bg-[#f5ead9] text-xl text-[#d15a29]"><Icon /></span><FiArrowRight className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#d15a29]" /></div><h2 className="font-['Manrope'] text-lg font-bold text-[#102b52]">{title}</h2><p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">{copy}</p></Link>)}</div>
    <section className="border border-[#e4dfd4] bg-white p-6"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center bg-[#102b52] text-white"><FiUser /></span><div><h2 className="font-bold text-[#102b52]">Profile information</h2><p className="text-sm text-slate-500">{user?.email || "Add your email to keep your account secure."}</p></div><Link to="/profile" className="ml-auto text-sm font-bold text-[#d15a29]">Edit</Link></div></section>
  </div></div>;
}
