import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
} from "react-icons/fi";

import Container from "../Common/Container";

import FooterColumn from "./FooterColumn";
import SocialLinks from "./SocialLinks";

import {
  quickLinks,
  categories,
  customerSupport,
} from "./footerLinks";

export default function Footer() {
  return (
    <footer className="bg-[#081C36] text-white">

      <Container>

        <div className="grid gap-12 py-20 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">

          {/* Company */}

          <div>

            <h2 className="text-3xl font-black">
              Rama Stationers
              <span className="text-orange-500"> & Sports</span>
            </h2>

            <p className="mt-6 max-w-sm leading-8 text-slate-300">
              Your trusted destination for premium stationery,
              office supplies, school essentials, and sports
              equipment in Gorakhpur.
            </p>

            <div className="mt-8">
              <SocialLinks />
            </div>

          </div>

          <FooterColumn
            title="Quick Links"
            links={quickLinks}
          />

          <FooterColumn
            title="Categories"
            links={categories}
          />

          <div>

            <h3 className="text-lg font-bold">
              Contact Us
            </h3>

            <div className="mt-6 space-y-5">

              <div className="flex gap-3">
                <FiMapPin className="mt-1 text-orange-500" />
                <p className="text-slate-300">
                  Gorakhpur, Uttar Pradesh
                </p>
              </div>

              <div className="flex gap-3">
                <FiPhone className="mt-1 text-orange-500" />
                <p className="text-slate-300">
                  +91 XXXXX XXXXX
                </p>
              </div>

              <div className="flex gap-3">
                <FiMail className="mt-1 text-orange-500" />
                <p className="text-slate-300">
                  info@ramastationers.com
                </p>
              </div>

              <div className="flex gap-3">
                <FiClock className="mt-1 text-orange-500" />
                <p className="text-slate-300">
                  Mon – Sat | 9:00 AM – 8:30 PM
                </p>
              </div>

            </div>

          </div>

        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-sm text-slate-400 md:flex-row">

          <p>
            © {new Date().getFullYear()} Rama Stationers & Sports.
            All Rights Reserved.
          </p>

          <p>
            Designed with ❤️ for students, professionals &
            sports enthusiasts.
          </p>

        </div>

      </Container>

    </footer>
  );
}