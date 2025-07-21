import { create } from "zustand";
import axiosInstance from "./axiosInstance";

export type FundTransaction = {
  _id: string;
  date: string | Date;
  amount: number;
  account: string;
  type: "Add" | "Withdraw";
};

type FundTransactionStore = {
  transactions: FundTransaction[];
  loading: boolean;
  error: string | null;

  fetchTransactions: (filters?: {
    broker?: string;
    type?: "Add" | "Withdraw" | "All";
    startDate?: string;
    endDate?: string;
  }) => Promise<void>;

  addTransaction: (tx: Omit<FundTransaction, "_id">) => Promise<void>;
};

export const useFundTransactionStore = create<FundTransactionStore>((set) => ({
  transactions: [],
  loading: false,
  error: null,

  fetchTransactions: async (filters = {}) => {
    try {
      set({ loading: true, error: null });

      const params = new URLSearchParams();

      for (const key in filters) {
        if (filters[key]) {
          params.append(key, filters[key]);
        }
      }

      const res = await axiosInstance.get(`/funds?${params.toString()}`);
      set({ transactions: res.data.transactions, loading: false });
    } catch (err: any) {
      set({ loading: false, error: err.message || "Failed to fetch" });
    }
  },

  addTransaction: async (tx) => {
    try {
      set({ loading: true, error: null });
      await axiosInstance.post("/funds", tx);
      await useFundTransactionStore.getState().fetchTransactions();
    } catch (err: any) {
      set({ loading: false, error: err.message || "Failed to add" });
    }
  },
}));
