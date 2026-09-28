import { useState } from "react";
import { Link } from "react-router-dom";
import { FiUser, FiMail, FiPhone } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import authApi from "../api/authApi";
import AuthInput from "../components/Auth/AuthInput";
import PasswordInput from "../components/Auth/PasswordInput";
import PasswordStrength from "../components/Auth/PasswordStrength";
import AuthButton from "../components/Auth/AuthButton";
import FormDivider from "../components/Auth/FormDivider";
import SocialLogin from "../components/Auth/SocialLogin";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit mobile number";
    }

    if (formData.password.length < 8) {
      newErrors.password =
        "Password must contain at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword =
        "Passwords do not match";
    }

    if (!formData.agree) {
      newErrors.agree =
        "Please accept the Terms & Conditions";
    }

    return newErrors;
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const validationErrors = validate();

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  setErrors({});

  try {
    setLoading(true);

    const { data } = await authApi.register({
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    });

    toast.success("Registration successful!");
    navigate("/login");
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Registration failed."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      {/* Heading */}

      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-[#102B52]">
          Welcome 👋
        </h1>

        <h2 className="mt-2 text-2xl font-bold text-slate-800">
          Create Your Account
        </h2>

        <p className="mt-3 leading-7 text-slate-500">
          Sign up to enjoy faster checkout,
          order tracking, wishlist syncing,
          and exclusive offers from
          Rama Stationers & Sports.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* Full Name */}

        <AuthInput
          icon={<FiUser />}
          label="Full Name"
          name="fullName"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
          required
        />

        {/* Email */}

        <AuthInput
          icon={<FiMail />}
          label="Email Address"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />

        {/* Phone */}

        <AuthInput
          icon={<FiPhone />}
          label="Phone Number"
          name="phone"
          type="tel"
          placeholder="Enter your mobile number"
          value={formData.phone}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");

            setFormData((prev) => ({
              ...prev,
              phone: value.slice(0, 10),
            }));
          }}
          error={errors.phone}
          required
        />

        {/* Password */}

        <PasswordInput
          label="Password"
          placeholder="Create password"
          value={formData.password}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              password: e.target.value,
            }))
          }
          error={errors.password}
        />

        <PasswordStrength
          password={formData.password}
        />

        {/* Confirm Password */}

        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              confirmPassword: e.target.value,
            }))
          }
          error={errors.confirmPassword}
        />

        {formData.confirmPassword && (
          <p
            className={`text-sm ${
              formData.password ===
              formData.confirmPassword
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {formData.password ===
            formData.confirmPassword
              ? "✔ Passwords match"
              : "✖ Passwords don't match"}
          </p>
        )}

        {/* Terms */}

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              className="mt-1 h-4 w-4 accent-[#102B52]"
            />

            <span className="text-sm text-slate-600">
              I agree to the{" "}
              <Link
                to="/terms"
                className="font-semibold text-[#102B52] hover:underline"
              >
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="font-semibold text-[#102B52] hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </span>
          </label>

          {errors.agree && (
            <p className="mt-2 text-sm text-red-500">
              {errors.agree}
            </p>
          )}
        </div>

        {/* Button */}

        <AuthButton loading={loading}>
          {loading
            ? "Creating Account..."
            : "Create My Account →"}
        </AuthButton>

        <FormDivider />

        <SocialLogin />

        {/* Benefits */}

        <div className="rounded-2xl bg-slate-50 p-5">
          <h3 className="mb-3 font-semibold text-[#102B52]">
            Why Create an Account?
          </h3>

          <ul className="space-y-2 text-sm text-slate-600">
            <li>✅ Faster Checkout</li>
            <li>✅ Track Your Orders</li>
            <li>✅ Save Wishlist</li>
            <li>✅ Get Exclusive Offers</li>
          </ul>
        </div>

        {/* Login */}

        <p className="text-center text-sm text-slate-600">
          Already have an account?

          <Link
            to="/login"
            className="ml-2 font-semibold text-[#102B52] hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </>
  );
}