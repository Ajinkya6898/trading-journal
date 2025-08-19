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
  dashBoardData: any;
  doughnutData: number[];
  loading: boolean;
  error: string | null;
  fetchDashboardTrades: () => Promise<void>;
};

const useDashboardStore = create<DashboardState>((set) => ({
  trades: [],
  doughnutData: [],
  dashBoardData: [],
  loading: false,
  error: null,

  fetchDashboardTrades: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.get("/dashboard");

      set({
        trades: response.data.monthlyTradeStats,
        doughnutData: response.data.doughnutData.datasets[0].data || [],
        dashBoardData: response.data,
        loading: false,
      });
    } catch (err) {
      console.error("Failed to fetch dashboard trades", err);
      set({ error: "Failed to load dashboard data", loading: false });
    }
  },
}));

export default useDashboardStore;
