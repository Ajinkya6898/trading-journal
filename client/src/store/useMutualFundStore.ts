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

  addEntry: () => Promise<void>;
  loadEntries: () => Promise<void>;
}

export const useMutualFundStore = create<MutualFundStore>((set, get) => ({
  entries: [],
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

  loadEntries: async () => {
    try {
      const response = await axiosInstance.get(
        "http://localhost:8080/api/mutual-funds"
      );
      set(() => ({
        entries: response.data,
      }));
    } catch (error) {
      console.error("Failed to fetch mutual fund entries", error);
    }
  },
}));
