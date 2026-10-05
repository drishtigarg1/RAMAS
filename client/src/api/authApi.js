import api from "./api";

const authApi = {
  register: (userData) =>
    api.post("/auth/register", userData),

  login: (credentials) =>
    api.post("/auth/login", credentials),

  forgotPassword: (data) =>
    api.post("/auth/forgot-password", data),

  resetPassword: (data) =>
    api.post(`/auth/reset-password/${data.token}`, { password: data.password }),

  logout: () =>
    api.post("/auth/logout"),

  profile: () =>
    api.get("/auth/me"),
};

export default authApi;
