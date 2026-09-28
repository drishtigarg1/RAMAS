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
import Orders from "./pages/Orders";
import Addresses from "./pages/Addresses";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";
import ResetPassword from "./pages/ResetPassword";

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
        </Route>
      </Route>

      {/* ================= MAIN WEBSITE ================= */}
      <Route element={<MainLayout />}>

        {/* ================= AUTH PAGES ================= */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
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
