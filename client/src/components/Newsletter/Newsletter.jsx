import { FiMail, FiSend } from "react-icons/fi";
import Container from "../Common/Container";

export default function Newsletter() {
  return (
    <section className="py-20 bg-[#102B52] overflow-hidden">
      <Container>
        <div className="relative rounded-[32px] bg-gradient-to-r from-[#173D73] to-[#102B52] px-8 py-14 lg:px-16">

          {/* Decorative Circles */}

          <div className="absolute -top-24 -left-20 h-64 w-64 rounded-full bg-white/5"></div>
          <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-orange-400/10"></div>

          <div className="relative grid items-center gap-10 lg:grid-cols-2">

            {/* Left */}

            <div>

              <span className="inline-flex rounded-full bg-orange-500 px-4 py-1 text-sm font-semibold text-white">
                Stay Updated
              </span>

              <h2 className="mt-5 text-4xl font-black text-white">
                Never Miss New Products &
                <br />
                Exclusive Deals
              </h2>

              <p className="mt-5 max-w-xl text-slate-300 leading-8">
                Subscribe to receive updates about new arrivals,
                exclusive discounts, stationery collections,
                sports equipment, and seasonal offers.
              </p>

            </div>

            {/* Right */}

            <form className="flex flex-col gap-4 sm:flex-row">

              <div className="relative flex-1">

                <FiMail
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                  size={20}
                />

                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="
                    h-14
                    w-full
                    rounded-xl
                    border-none
                    bg-white
                    pl-14
                    pr-4
                    outline-none
                    focus:ring-4
                    focus:ring-orange-300
                  "
                />

              </div>

              <button
                className="
                  flex
                  h-14
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-orange-500
                  px-8
                  font-semibold
                  text-white
                  transition
                  hover:bg-orange-600
                "
              >
                <FiSend />
                Subscribe
              </button>

            </form>

          </div>

        </div>
      </Container>
    </section>
  );
}