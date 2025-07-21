import axios from "axios";
import { useAuthStore } from "./useAuthStore";
const history = createBrowserHistory();
import { createBrowserHistory } from "history";

const axiosInstance = axios.create({
  baseURL: "https://trade-edge-backend.vercel.app/api",
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      localStorage.getItem("token")
    ) {
      const { logout } = useAuthStore.getState();
      logout();
      history.push("/login");
      // window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
