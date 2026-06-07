import axios from "axios";

const api = axios.create({
  baseURL:
    "https://ai-study-manager-2.onrender.com/api/v1",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization =
      `Bearer ${token}`;
  }

  return config;
});

export default api;