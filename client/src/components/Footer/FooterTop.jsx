import { Link } from "react-router-dom";

export default function FooterTop() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

      <div>

        <h2 className="text-3xl font-black">
          RAMA
        </h2>

        <p className="text-gray-300 mt-4">
          Your one-stop destination for stationery,
          sports, office and art supplies.
        </p>

      </div>

      <div>

        <h3 className="font-bold mb-5">
          Categories
        </h3>

        <div className="space-y-3">

          <Link to="/category/school">School</Link><br/>

          <Link to="/category/office">Office</Link><br/>

          <Link to="/category/art-craft">Art & Craft</Link><br/>

          <Link to="/category/sports">Sports</Link>

        </div>

      </div>

      <div>

        <h3 className="font-bold mb-5">
          Customer
        </h3>

        <div className="space-y-3">

          <Link to="/orders">Orders</Link><br/>

          <Link to="/wishlist">Wishlist</Link><br/>

          <Link to="/cart">Cart</Link><br/>

          <Link to="/contact">Contact</Link>

        </div>

      </div>

      <div>

        <h3 className="font-bold mb-5">
          Information
        </h3>

        <div className="space-y-3">

          <Link to="/about">About Us</Link><br/>

          <Link to="/privacy">Privacy Policy</Link><br/>

          <Link to="/terms">Terms</Link><br/>

          <Link to="/shipping">Shipping</Link>

        </div>

      </div>

      <div>

        <h3 className="font-bold mb-5">
          Contact
        </h3>

        <p>Gorakhpur, Uttar Pradesh</p>

        <p className="mt-3">
          support@ramastationers.com
        </p>

        <p className="mt-3">
          +91 XXXXX XXXXX
        </p>

      </div>

    </div>
  );
}