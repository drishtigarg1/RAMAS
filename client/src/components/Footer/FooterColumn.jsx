import { Link } from "react-router-dom";

export default function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="text-lg font-bold text-white">
        {title}
      </h3>

      <ul className="mt-6 space-y-3">
        {links.map((link) => (
          <li key={link.title}>
            <Link
              to={link.path}
              className="text-slate-300 transition hover:text-orange-400"
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}