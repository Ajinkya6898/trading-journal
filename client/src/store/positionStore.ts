import { create } from "zustand";

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
    const BASE_URL = "http://localhost:8080/api/positions";
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
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`, // If using auth later
        },
        body: JSON.stringify(newEntry),
      });

      if (!response.ok) {
        const err = await response.json();
        console.error("Failed to save:", err);
        return;
      }

      const saved = await response.json();

      set((state) => ({
        entries: [saved, ...state.entries],
      }));
    } catch (error) {
      console.error("Network/server error:", error);
    }
  },

  loadEntries: async () => {
    const BASE_URL = "http://localhost:8080/api/positions";

    try {
      const response = await fetch(BASE_URL);
      if (!response.ok) {
        const err = await response.json();
        console.error("Failed to load entries:", err);
        return;
      }

      const data: PositionEntry[] = await response.json();
      set(() => ({
        entries: data,
      }));
    } catch (error) {
      console.error("Failed to load entries:", error);
    }
  },
}));
