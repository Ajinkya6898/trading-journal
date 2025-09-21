import { create } from "zustand";
import axiosInstance from "./axiosInstance";

type RiskPositionEntry = {
  _id: string;
  id: string;
  stockName: string;
  totalCapital: number;
  riskPercent: number;
  riskAmount: number;
  entryPrice: number;
  stopLossPrice: number;
  positionSize: number;
  atr: number;
  atrMultiplier: number;
  partialTarget: number;
  hardsl: number;
  partialSellQty: number;
  partialPercent: number;
  exitReturnPercent: number;
  exitPrice: number;
  createdAt: string;
};

type RiskPositionStore = {
  entries: RiskPositionEntry[];
  current: {
    [x: string]: string;
    stockName: string;
    totalCapital: string;
    riskPercent: string;
    riskAmount: string;
    entryPrice: string;
    stopLossPrice: string;
    positionSize: string;
    atr: string;
    atrMultiplier: string;
    partialTarget: string;
    hardsl: string;
    partialSellQty: string;
    partialPercent: string;
    exitReturnPercent: string;
    exitPrice: string;
  };
  setField: (field: string, value: string) => void;
  calculatePositionSize: () => void;
  calculateTargets: () => void;
  calculateExitPrice: () => void;
  clearCurrent: () => void;
  saveEntry: () => void;
  loadEntries: () => void;
};

export const useRiskPositionStore = create<RiskPositionStore>((set, get) => ({
  entries: [],
  current: {
    stockName: "",
    totalCapital: "",
    riskPercent: "0.5",
    riskAmount: "",
    entryPrice: "",
    stopLossPrice: "",
    positionSize: "",
    atr: "",
    atrMultiplier: "1",
    partialTarget: "",
    hardsl: "",
    partialSellQty: "",
    partialPercent: "50",
    exitReturnPercent: "10",
    exitPrice: "",
  },

  setField: (field, value) =>
    set((state) => ({
      current: {
        ...state.current,
        [field]: value,
      },
    })),

  calculatePositionSize: () => {
    const { totalCapital, riskPercent } = get().current;

    const capital = parseFloat(totalCapital);
    const risk = parseFloat(riskPercent);

    if (isNaN(capital) || isNaN(risk)) return;

    const riskAmt = capital * (risk / 100);

    set((state) => ({
      current: {
        ...state.current,
        riskAmount: riskAmt.toFixed(2),
      },
    }));
  },

  calculateTargets: () => {
    const { entryPrice, atr, atrMultiplier, positionSize, partialPercent } =
      get().current;

    const price = parseFloat(entryPrice);
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
    const sellQty = Math.round(posSize * (percent / 100));

    set((state) => ({
      current: {
        ...state.current,
        partialTarget: target.toFixed(2),
        hardsl: hardsl.toFixed(2),
        partialSellQty: sellQty.toString(),
      },
    }));
  },

  calculateExitPrice: () => {
    const { entryPrice, exitReturnPercent } = get().current;

    const price = parseFloat(entryPrice);
    const returnPct = parseFloat(exitReturnPercent);

    if (isNaN(price) || isNaN(returnPct)) return;

    const exitPrice = price * (1 + returnPct / 100);

    set((state) => ({
      current: {
        ...state.current,
        exitPrice: exitPrice.toFixed(2),
      },
    }));
  },

  clearCurrent: () =>
    set(() => ({
      current: {
        stockName: "",
        totalCapital: "",
        riskPercent: "0.5",
        riskAmount: "",
        entryPrice: "",
        stopLossPrice: "",
        positionSize: "",
        atr: "",
        atrMultiplier: "1",
        partialTarget: "",
        hardsl: "",
        partialSellQty: "",
        partialPercent: "50",
        exitReturnPercent: "10",
        exitPrice: "",
      },
    })),

  saveEntry: async () => {
    const BASE_URL = "/positions-risk";
    const {
      stockName,
      totalCapital,
      riskPercent,
      riskAmount,
      entryPrice,
      stopLossPrice,
      positionSize,
      atr,
      atrMultiplier,
      partialTarget,
      hardsl,
      partialSellQty,
      partialPercent,
      exitReturnPercent,
      exitPrice,
    } = get().current;

    // if (
    //   !stockName ||
    //   !totalCapital ||
    //   !riskPercent ||
    //   !entryPrice ||
    //   !stopLossPrice ||
    //   !positionSize
    // )
    //   return;

    const newEntry = {
      stockName,
      totalCapital: parseFloat(totalCapital),
      riskPercent: parseFloat(riskPercent),
      riskAmount: parseFloat(riskAmount),
      entryPrice: parseFloat(entryPrice),
      stopLossPrice: parseFloat(stopLossPrice),
      positionSize: parseFloat(positionSize),
      atr: parseFloat(atr),
      atrMultiplier: parseFloat(atrMultiplier),
      partialTarget: parseFloat(partialTarget),
      hardsl: parseFloat(hardsl),
      partialSellQty: parseFloat(partialSellQty),
      partialPercent: parseFloat(partialPercent),
      exitReturnPercent: parseFloat(exitReturnPercent),
      exitPrice: parseFloat(exitPrice),
    };

    try {
      const response = await axiosInstance.post(BASE_URL, newEntry);
      const saved = response.data;

      set((state) => ({
        entries: [saved, ...state.entries],
      }));
    } catch (error: any) {
      console.error(
        "Failed to save risk-based position:",
        error.response?.data || error
      );
    }
  },

  loadEntries: async () => {
    const BASE_URL = "/positions-risk";

    try {
      const response = await axiosInstance.get(BASE_URL);
      const data: RiskPositionEntry[] = response.data;

      set(() => ({
        entries: data,
      }));
    } catch (error: any) {
      console.error(
        "Failed to load risk-based entries:",
        error.response?.data || error
      );
    }
  },
}));
