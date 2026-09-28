import { Link } from "react-router-dom";
import {
  FiMapPin,
  FiPhoneCall,
  FiMail,
  FiTruck,
} from "react-icons/fi";

export default function TopBar() {
  return (
    <div className="bg-[#102B52] text-white text-xs sm:text-sm">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between">

        {/* Left Section */}
        <div className="flex items-center gap-4 lg:gap-6">

          <div className="hidden sm:flex items-center gap-1.5">
            <FiMapPin size={14} />
            <span>Gorakhpur, Uttar Pradesh</span>
          </div>

          <div className="flex items-center gap-1.5 text-orange-300 font-medium">
            <FiTruck size={14} />
            <span>Free Delivery on Orders Above ₹499</span>
          </div>

        </div>

        {/* Right Section */}
        <div className="flex items-center gap-5">

          <Link
            to="/track-order"
            className="hidden lg:block hover:text-orange-300 transition-colors"
          >
            Track Order
          </Link>

          <Link
            to="/contact"
            className="hidden lg:block hover:text-orange-300 transition-colors"
          >
            Help
          </Link>

          <div className="hidden xl:flex items-center gap-1.5">
            <FiPhoneCall size={14} />
            <span>+91 XXXXX XXXXX</span>
          </div>

          <div className="hidden xl:flex items-center gap-1.5">
            <FiMail size={14} />
            <span>support@ramastationers.com</span>
          </div>

        </div>

      </div>
    </div>
  );
}