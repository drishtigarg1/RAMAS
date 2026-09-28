import { FiMail } from "react-icons/fi";

export default function Newsletter() {
  return (
    <section className="relative -mt-24 z-10">
      <div className="max-w-7xl mx-auto px-5">

        <div className="rounded-3xl bg-gradient-to-r from-[#0F2C52] via-[#18457A] to-[#0F2C52] shadow-2xl overflow-hidden">

          <div className="grid lg:grid-cols-2 gap-10 items-center p-8 md:p-12">

            {/* Left Side */}

            <div>

              <span className="inline-block bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-widest">
                Newsletter
              </span>

              <h2 className="text-white text-4xl md:text-5xl font-black mt-5 leading-tight">
                Stay Updated
              </h2>

              <p className="text-blue-100 mt-5 text-lg leading-8 max-w-lg">
                Subscribe to receive exclusive offers,
                latest arrivals, school season discounts,
                sports deals and exciting product launches.
              </p>

            </div>

            {/* Right Side */}

            <div>

              <div className="bg-white rounded-2xl p-3 flex flex-col sm:flex-row gap-3 shadow-xl">

                <div className="flex items-center flex-1">

                  <FiMail
                    className="text-gray-400 ml-4"
                    size={22}
                  />

                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full px-4 py-4 outline-none text-gray-700"
                  />

                </div>

                <button
                  className="
                  bg-orange-500
                  hover:bg-orange-600
                  transition
                  text-white
                  font-semibold
                  px-8
                  rounded-xl
                  h-14
                  whitespace-nowrap
                  "
                >
                  Subscribe
                </button>

              </div>

              <p className="text-blue-200 text-sm mt-4">
                No spam. Only exciting offers and product updates.
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}