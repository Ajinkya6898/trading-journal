import { create } from "zustand";
import axiosInstance from "./axiosInstance";

type PositionEntry = {
  id: string;
  stockName: string;
  investAmount: number;
  stockPrice: number;
  positionSize: number;
  atr: number;
  partialTarget: number;
  createdAt: string;
};

type PositionStore = {
  entries: PositionEntry[];
  current: {
    stockName: string;
    investAmount: string;
    stockPrice: string;
    positionSize: string;
    atr: string;
    atrMultiplier: string;
    partialTarget: string;
  };
  setField: (field: string, value: string) => void;
  calculatePositionSize: () => void;
  calculatePartialTarget: () => void;
  clearCurrent: () => void;
  saveEntry: () => void;
  loadEntries: () => void;
};

export const usePositionStore = create<PositionStore>((set, get) => ({
  entries: [],
  current: {
    stockName: "",
    investAmount: "100000",
    stockPrice: "",
    positionSize: "",
    atr: "",
    atrMultiplier: "1",
    partialTarget: "",
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

  calculatePartialTarget: () => {
    const { stockPrice, atr, atrMultiplier } = get().current;

    const price = parseFloat(stockPrice);
    const atrValue = parseFloat(atr);
    const multiplier = parseFloat(atrMultiplier);

    if (isNaN(price) || isNaN(atrValue) || isNaN(multiplier)) return;

    const target = price + atrValue * multiplier;

    set((state) => ({
      current: {
        ...state.current,
        partialTarget: target.toFixed(2),
      },
    }));
  },

  clearCurrent: () =>
    set(() => ({
      current: {
        stockName: "",
        investAmount: "",
        stockPrice: "",
        positionSize: "",
        atr: "",
        atrMultiplier: "1",
        partialTarget: "",
      },
    })),

  saveEntry: async () => {
    const BASE_URL = "/positions";
    const {
      stockName,
      investAmount,
      stockPrice,
      positionSize,
      atr,
      atrMultiplier,
      partialTarget,
    } = get().current;

    if (
      !stockName ||
      !investAmount ||
      !stockPrice ||
      !positionSize ||
      !atr ||
      !partialTarget
    )
      return;

    const newEntry = {
      stockName,
      investAmount: parseFloat(investAmount),
      stockPrice: parseFloat(stockPrice),
      positionSize: parseFloat(positionSize),
      atr: parseFloat(atr),
      partialTarget: parseFloat(partialTarget),
      atrMultiplier: parseFloat(atrMultiplier),
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
