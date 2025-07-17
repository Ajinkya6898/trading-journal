import { create } from "zustand";
import axiosInstance from "./axiosInstance";
const history = createBrowserHistory();
import { createBrowserHistory } from "history";

interface User {
  id: string;
  email: string;
  token: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set: any) => ({
  user: null,
  token: null,
  loading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post(
        "http://localhost:8080/api/auth/login",
        { email, password }
      );
      set({ user: response.data, token: response.data.token, loading: false });
      localStorage.setItem("token", response.data.token);
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Login failed",
        loading: false,
      });
      throw err;
    }
  },

  register: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post(
        "http://localhost:8080/api/auth/register",
        { email, password }
      );
      set({ user: response.data, token: response.data.token, loading: false });
      if (response.data.isNewUser) {
        history.push("/complete-profile");
      }
      localStorage.setItem("token", response.data.token);
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Register failed",
        loading: false,
      });
    }
  },

  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem("token");
  },
}));
