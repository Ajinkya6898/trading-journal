import { create } from "zustand";
import axiosInstance from "./axiosInstance";

export type DashboardTrade = {
  _id: string;
  entryDate: string;
  exitDate: string;
  symbol: string;
  quantity: number;
  boughtPrice: number;
  soldPrice: number;
  pnl: number;
  commission: number;
  notes: string;
  tradeImage: string | null;
};

type DashboardState = {
  trades: DashboardTrade[];
  loading: boolean;
  error: string | null;
  fetchDashboardTrades: () => Promise<void>;
};

const useDashboardStore = create<DashboardState>((set) => ({
  trades: [],
  loading: false,
  error: null,

  fetchDashboardTrades: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.get<DashboardTrade[]>(
        "http://localhost:8080/api/dashboard"
      );
      set({ trades: response.data, loading: false });
    } catch (err) {
      console.error("Failed to fetch dashboard trades", err);
      set({ error: "Failed to load dashboard data", loading: false });
    }
  },
}));

export default useDashboardStore;
