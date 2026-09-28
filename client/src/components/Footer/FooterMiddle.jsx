import {
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiTwitter,
  FiYoutube,
} from "react-icons/fi";

export default function FooterMiddle() {
  return (
    <div className="border-t border-blue-800">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col lg:flex-row items-center justify-between gap-8">

        {/* Payment Methods */}
        <div>
          <h3 className="font-semibold mb-4">Secure Payments</h3>

          <div className="flex flex-wrap gap-3">

            <div className="bg-white rounded-lg px-4 py-2 text-gray-800 font-medium">
              Visa
            </div>

            <div className="bg-white rounded-lg px-4 py-2 text-gray-800 font-medium">
              Mastercard
            </div>

            <div className="bg-white rounded-lg px-4 py-2 text-gray-800 font-medium">
              RuPay
            </div>

            <div className="bg-white rounded-lg px-4 py-2 text-gray-800 font-medium">
              UPI
            </div>

            <div className="bg-white rounded-lg px-4 py-2 text-gray-800 font-medium">
              COD
            </div>

          </div>
        </div>

        {/* Social Media */}
        <div>

          <h3 className="font-semibold mb-4 text-center lg:text-right">
            Follow Us
          </h3>

          <div className="flex gap-4">

            <a
              href="#"
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-orange-500 transition flex items-center justify-center"
            >
              <FiFacebook size={20} />
            </a>

            <a
              href="#"
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-orange-500 transition flex items-center justify-center"
            >
              <FiInstagram size={20} />
            </a>

            <a
              href="#"
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-orange-500 transition flex items-center justify-center"
            >
              <FiTwitter size={20} />
            </a>

            <a
              href="#"
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-orange-500 transition flex items-center justify-center"
            >
              <FiLinkedin size={20} />
            </a>

            <a
              href="#"
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-orange-500 transition flex items-center justify-center"
            >
              <FiYoutube size={20} />
            </a>

          </div>

        </div>

      </div>
    </div>
  );
}