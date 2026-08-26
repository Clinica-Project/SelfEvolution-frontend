import axios from "axios";
import { getToken, removeToken } from "@/lib/auth/token";

const apiBase =
  import.meta.env.VITE_API_URL ??
  import.meta.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:8080";

export const apiClient = axios.create({
  baseURL: apiBase,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const url: string = error?.config?.url ?? "";
    const isLoginRequest = url.includes("/auth/login");

    if (status === 401 && !isLoginRequest && typeof window !== "undefined") {
      removeToken();
      window.location.href = "/login?expired=1";
    }

    return Promise.reject(error);
  }
);
