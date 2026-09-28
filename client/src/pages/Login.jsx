import { useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthInput from "../components/Auth/AuthInput";
import PasswordInput from "../components/Auth/PasswordInput";
import AuthButton from "../components/Auth/AuthButton";
import FormDivider from "../components/Auth/FormDivider";
import SocialLogin from "../components/Auth/SocialLogin";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
const location = useLocation();
const { login } = useAuth();

const from = location.state?.from?.pathname || "/";
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/\S+@\S+\.\S+/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.password.trim()) {
      newErrors.password =
        "Password is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    setLoading(true);

    try {
      const { data } = await api.post("/auth/login", { 
        email: formData.email, 
        password: formData.password 
      });
      
      localStorage.setItem("token", data.token);
      login(data.user);
      navigate(from, { replace: true });
    } catch (error) {
       setErrors({ email: "Invalid email or password." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-8">

        <h1 className="text-4xl font-bold text-[#102B52]">
          Welcome Back 👋
        </h1>

        <p className="mt-2 text-slate-500">
          Login to continue shopping.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <AuthInput
          label="Email Address"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />

        <PasswordInput
          label="Password"
          placeholder="Enter password"
          value={formData.password}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              password: e.target.value,
            }))
          }
          error={errors.password}
        />

        <div className="flex items-center justify-between">

          <label className="flex items-center gap-2 text-sm">

            <input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
            />

            Remember Me

          </label>

          <Link
            to="/forgot-password"
            className="text-sm font-medium text-orange-500 hover:underline"
          >
            Forgot Password?
          </Link>

        </div>

        <AuthButton loading={loading}>
          Login
        </AuthButton>

        {/* <FormDivider />
        <SocialLogin /> */}

        <p className="text-center text-sm text-slate-600">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="font-semibold text-[#102B52] hover:underline"
          >
            Create Account
          </Link>

        </p>

      </form>
    </>
  );
}