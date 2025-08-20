import { create } from "zustand";
import axiosInstance from "./axiosInstance";

type PositionEntry = {
  _id: string;
  id: string;
  stockName: string;
  investAmount: number;
  stockPrice: number;
  positionSize: number;
  atr: number;
  atrMultiplier: number;
  partialTarget: number;
  hardsl: number;
  partialSellQty: number;
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
    hardsl: string;
    partialSellQty: string;
    partialPercent: string;
  };
  setField: (field: string, value: string) => void;
  calculatePositionSize: () => void;
  calculateTargets: () => void;
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
    hardsl: "",
    partialSellQty: "",
    partialPercent: "50",
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

  calculateTargets: () => {
    const { stockPrice, atr, atrMultiplier, positionSize, partialPercent } =
      get().current;

    const price = parseFloat(stockPrice);
    const atrValue = parseFloat(atr);
    const multiplier = parseFloat(atrMultiplier);
    const posSize = parseFloat(positionSize);
    const percent = parseFloat(partialPercent);

    if (
      isNaN(price) ||
      isNaN(atrValue) ||
      isNaN(multiplier) ||
      isNaN(posSize) ||
      isNaN(percent)
    )
      return;

    const target = price + atrValue * multiplier;

    const hardsl = price - atrValue * multiplier;

    const sellQty = posSize * (percent / 100);

    set((state) => ({
      current: {
        ...state.current,
        partialTarget: target.toFixed(2),
        hardsl: hardsl.toFixed(2),
        partialSellQty: sellQty.toFixed(2),
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
        hardsl: "",
        partialSellQty: "",
        partialPercent: "50",
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
      hardsl,
      partialSellQty,
      partialPercent,
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
      atrMultiplier: parseFloat(atrMultiplier),
      partialTarget: parseFloat(partialTarget),
      hardsl: parseFloat(hardsl),
      partialSellQty: parseFloat(partialSellQty),
      partialPercent: parseFloat(partialPercent),
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
