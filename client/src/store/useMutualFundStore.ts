import { create } from "zustand";
import axiosInstance from "./axiosInstance";

export interface MutualFundEntry {
  fundName: string;
  date: Date;
  units: number;
  nav: number;
  amount: number;
  _id?: string;
}

interface MutualFundStore {
  entries: MutualFundEntry[];
  current: MutualFundEntry;

  setField: (field: keyof MutualFundEntry, value: any) => void;
  clearForm: () => void;
  loading: boolean;
  error: string | null;
  addEntry: () => Promise<void>;
  fetchFunds: () => Promise<void>;
}
const mapBackendToFrontend = (fund: any): any => ({
  id: fund._id,
  fundName: fund.fundName,
  date: fund.date,
  units: fund.units,
  nav: fund.nav,
  amount: fund.amount,
});

export const useMutualFundStore = create<MutualFundStore>((set, get) => ({
  entries: [],
  loading: false,
  error: null,
  current: {
    fundName: "",
    date: new Date(),
    units: 0,
    nav: 0,
    amount: 0,
  },

  setField: (field, value) =>
    set((state) => ({
      current: {
        ...state.current,
        [field]: value,
      },
    })),

  clearForm: () =>
    set(() => ({
      current: {
        fundName: "",
        date: new Date(),
        units: 0,
        nav: 0,
        amount: 0,
      },
    })),

  addEntry: async () => {
    const { fundName, date, units, nav, amount } = get().current;

    if (!fundName || !date || !units || !nav || !amount) {
      console.warn("Missing required fields");
      return;
    }

    try {
      const response = await axiosInstance.post(
        "http://localhost:8080/api/mutual-funds",
        {
          fundName,
          date,
          units,
          nav,
          amount,
        }
      );

      set((state) => ({
        entries: [response.data, ...state.entries],
      }));

      get().clearForm();
    } catch (error) {
      console.error("Failed to add mutual fund entry", error);
    }
  },

  fetchFunds: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.get(
        "http://localhost:8080/api/mutual-funds"
      );

      const mappedFunds = response.data.map(mapBackendToFrontend);
      set({ entries: mappedFunds, loading: false });
    } catch (err) {
      console.error("Error fetching mutual fund data", err);
      set({ error: "Failed to fetch mutual fund data", loading: false });
    }
  },
}));
