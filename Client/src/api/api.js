import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true
});

/* attach token automatically */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");   // or wherever you store JWT
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
