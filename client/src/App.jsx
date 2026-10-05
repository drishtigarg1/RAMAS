import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

// Protected Route
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import CategoryPage from "./pages/CategoryPage";
import SubCategoryPage from "./pages/SubCategoryPage";
import BrandPage from "./pages/BrandPage";
import SearchPage from "./pages/SearchPage";
import OffersPage from "./pages/OffersPage";

import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";

import Profile from "./pages/Profile";
import Orders from "./pages/orders";
import Addresses from "./pages/Addresses";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Terms from "./pages/Info/Terms";
import PrivacyPolicy from "./pages/Info/PrivacyPolicy";
import ShippingPolicy from "./pages/Info/ShippingPolicy";
import ReturnPolicy from "./pages/Info/ReturnPolicy";
import FAQ from "./pages/Info/FAQ";

import About from "./pages/About";
import Contact from "./pages/Contact";

import NotFound from "./pages/NotFound";

// Admin Protected Route
import AdminRoute from "./routes/AdminRoute";
import AdminLayout from "./admin/layouts/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import AdminProducts from "./admin/pages/Products";
import AdminOrders from "./admin/pages/Orders";
import ProductEdit from "./admin/pages/ProductEdit";
import AdminMessages from "./admin/pages/Messages";

function App() {
  return (
    <Routes>
      {/* ================= ADMIN PAGES ================= */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/:id" element={<ProductEdit />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="messages" element={<AdminMessages />} />
        </Route>
      </Route>

      {/* ================= MAIN WEBSITE ================= */}
      <Route element={<MainLayout />}>

        {/* ================= AUTH PAGES ================= */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        {/* ================= PUBLIC PAGES ================= */}
        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Products />} />
        <Route path="/product/:slug" element={<ProductDetail />} />

        <Route
          path="/category/:categorySlug"
          element={<CategoryPage />}
        />

        <Route
          path="/category/:categorySlug/:subCategorySlug"
          element={<SubCategoryPage />}
        />

        <Route
          path="/brand/:brandSlug"
          element={<BrandPage />}
        />

        <Route path="/search" element={<SearchPage />} />
        <Route path="/offers" element={<OffersPage />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/shipping" element={<ShippingPolicy />} />
        <Route path="/returns" element={<ReturnPolicy />} />
        <Route path="/faq" element={<FAQ />} />

        {/* ================= PROTECTED PAGES ================= */}
        <Route element={<ProtectedRoute />}>

          <Route path="/checkout" element={<Checkout />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/account" element={<Profile />} />
          <Route path="/account/addresses" element={<Addresses />} />

          <Route path="/orders" element={<Orders />} />
          <Route path="/account/orders" element={<Orders />} />

        </Route>

      </Route>

      {/* ================= 404 ================= */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
