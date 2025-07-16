import { create } from "zustand";
import axiosInstance from "./axiosInstance";

type PositionEntry = {
  id: string;
  stockName: string;
  totalAmount: number;
  investAmount: number;
  stockPrice: number;
  positionSize: number;
  createdAt: string;
};

type PositionStore = {
  entries: PositionEntry[];
  current: {
    stockName: string;
    totalAmount: string;
    investAmount: string;
    stockPrice: string;
    positionSize: string;
  };
  setField: (field: string, value: string) => void;
  calculatePositionSize: () => void;
  clearCurrent: () => void;
  saveEntry: () => void;
  loadEntries: () => void;
};

export const usePositionStore = create<PositionStore>((set, get) => ({
  entries: [],
  current: {
    stockName: "",
    totalAmount: "",
    investAmount: "",
    stockPrice: "",
    positionSize: "",
  },

  setField: (field, value) =>
    set((state) => ({
      current: {
        ...state.current,
        [field]: value,
      },
    })),

  calculatePositionSize: () => {
    const { stockName, investAmount, stockPrice } = get().current;

    const invest = parseFloat(investAmount);
    const price = parseFloat(stockPrice);

    if (
      !stockName ||
      isNaN(invest) ||
      isNaN(price) ||
      invest <= 0 ||
      price <= 0
    )
      return;

    const posSize = invest / price;

    set((state) => ({
      current: {
        ...state.current,
        positionSize: posSize.toFixed(2),
      },
    }));
  },

  clearCurrent: () =>
    set(() => ({
      current: {
        stockName: "",
        totalAmount: "",
        investAmount: "",
        stockPrice: "",
        positionSize: "",
      },
    })),

  saveEntry: async () => {
    const BASE_URL = "/positions"; // since axiosInstance already has baseURL
    const { stockName, totalAmount, investAmount, stockPrice, positionSize } =
      get().current;

    if (
      !stockName ||
      !totalAmount ||
      !investAmount ||
      !stockPrice ||
      !positionSize
    )
      return;

    const newEntry = {
      stockName,
      totalAmount: parseFloat(totalAmount),
      investAmount: parseFloat(investAmount),
      stockPrice: parseFloat(stockPrice),
      positionSize: parseFloat(positionSize),
    };

    try {
      const response = await axiosInstance.post(BASE_URL, newEntry);
      const saved = response.data;

      set((state) => ({
        entries: [saved, ...state.entries],
      }));
    } catch (error: any) {
      console.error("Failed to save position:", error.response?.data || error);
    }
  },

  loadEntries: async () => {
    const BASE_URL = "/positions";

    try {
      const response = await axiosInstance.get(BASE_URL);
      const data: PositionEntry[] = response.data;

      set(() => ({
        entries: data,
      }));
    } catch (error: any) {
      console.error("Failed to load entries:", error.response?.data || error);
    }
  },
}));
