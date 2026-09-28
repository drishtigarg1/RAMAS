import api from "./api";

const authApi = {
  register: (userData) =>
    api.post("/auth/register", userData),

  login: (credentials) =>
    api.post("/auth/login", credentials),

  verifyOTP: (data) =>
    api.post("/auth/verify-otp", data),

  resendOTP: (data) =>
    api.post("/auth/resend-otp", data),

  forgotPassword: (data) =>
    api.post("/auth/forgot-password", data),

  resetPassword: (data) =>
    api.post("/auth/reset-password", data),

  logout: () =>
    api.post("/auth/logout"),

  profile: () =>
    api.get("/auth/profile"),
};

export default authApi;