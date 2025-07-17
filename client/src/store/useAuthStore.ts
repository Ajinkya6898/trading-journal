import { create } from "zustand";
import axiosInstance from "./axiosInstance";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

interface UserProfile {
  fullName: string;
  dob: string;
  phone: number;
  gender: string;
  country: string;
  profession: string;
  experience: number;

  // Optional Sections
  address?: {
    addressLine?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
  primaryPlatform?: string;
  accountType?: string;
  yearsTrading?: number;
  tradingStyle?: string;
  receiveTips?: boolean;
  darkMode?: boolean;
  emailUpdatesL?: boolean;
  investmentGoals?: string[];
  communicationPrefs?: {
    newsletter?: boolean;
    alerts?: boolean;
  };
}

interface User {
  id: string;
  email: string;
  token: string;
  profile?: UserProfile;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  loggedIn: boolean;

  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  setProfile: (profile: UserProfile) => void;
  updateProfile: any;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,
  loggedIn: false,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const loginResponse = await axiosInstance.post(
        "http://localhost:8080/api/auth/login",
        { email, password }
      );

      const { token, ...rest } = loginResponse.data;

      localStorage.setItem("token", token);

      const profileResponse = await axiosInstance.get(
        "http://localhost:8080/api/auth/my-profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const fullUser = profileResponse.data;

      set({
        user: fullUser,
        token,
        loggedIn: true,
        loading: false,
      });

      localStorage.setItem("userInformation", JSON.stringify(fullUser));
      localStorage.setItem("loggedIn", "true"); // optional persistence
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Login failed",
        loading: false,
        loggedIn: false,
      });
      throw err;
    }
  },

  register: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post(
        "http://localhost:8080/api/auth/register",
        { email, password }
      );

      const { token, isNewUser, ...rest } = response.data;
      set({ user: { ...rest, token }, token, loading: false });
      localStorage.setItem("token", token);

      if (isNewUser) {
        history.push("/complete-profile");
      }
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Register failed",
        loading: false,
      });
    }
  },

  setProfile: (profile) => {
    set((state) => ({
      user: state.user ? { ...state.user, profile } : null,
    }));
  },

  updateProfile: async (data: Partial<any>) => {
    const payload = {
      ...data,
      dob: data.dob ? new Date(data.dob).toISOString() : undefined,
    };

    try {
      const res = await axiosInstance.put("/auth/profile", payload);
      set((state) => ({
        user: {
          ...state.user!,
          profile: {
            ...state.user?.profile,
            ...res.data,
          },
        },
      }));
    } catch (err: any) {
      console.error("Update profile error:", err.response?.data || err.message);
      throw new Error(err.response?.data?.message || "Profile update failed");
    }
  },

  logout: () => {
    console.log("Logging out...");
    set({ user: null, token: null, loggedIn: false });
    localStorage.removeItem("token");
    localStorage.removeItem("userInformation");
    localStorage.setItem("loggedIn", "false");
  },
}));
