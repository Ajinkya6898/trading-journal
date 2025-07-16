import { create } from "zustand";
import axios from "axios";

// Backend response shape
interface BackendTrade {
  _id: string;
  entryDate: string;
  exitDate: string;
  symbol: string;
  quantity: number;
  boughtPrice: number;
  timeFrame: string;
  soldPrice: number;
  pnl: number;
  commission: number;
  notes: string;
  tradeImage: string;
}

// Frontend Trade type (already you are using)
export interface Trade {
  id: string;
  entryDate: string;
  exitDate: string;
  daysHeld: number;
  stockName: string;
  qty: number;
  entryPrice: number;
  timeFrame: string;
  exitPrice: number;
  pnl: number;
  commission: number;
  realisedPnl: number;
  win: boolean;
  winPercent: number;
  pnlPercent: number;
  rsAtWork: number;
}

interface StockStoreState {
  trades: Trade[];
  loading: boolean;
  error: string | null;
  fetchTrades: () => Promise<void>;
  addTrade: (tradeData: {
    entryDate: Date;
    exitDate: Date;
    symbol: string;
    quantity: number;
    boughtPrice: number;
    timeFrame: string;
    soldPrice: number;
    pnl: number;
    commission: number;
    notes: string;
    tradeImage?: File | null;
  }) => Promise<void>;
}
const mapBackendToFrontend = (trade: BackendTrade): Trade => {
  const entryDate = new Date(trade.entryDate);
  const exitDate = new Date(trade.exitDate);
  const daysHeld = Math.max(
    1,
    Math.ceil(
      (exitDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24)
    )
  );

  const realisedPnl = trade.pnl - trade.commission;
  const win = realisedPnl >= 0;
  const winPercent = win ? 100 : 0;
  const pnlPercent =
    ((trade.soldPrice - trade.boughtPrice) / trade.boughtPrice) * 100;
  const rsAtWork = trade.boughtPrice * trade.quantity;

  return {
    id: trade._id,
    entryDate: trade.entryDate,
    exitDate: trade.exitDate,
    daysHeld,
    stockName: trade.symbol,
    qty: trade.quantity,
    entryPrice: trade.boughtPrice,
    timeFrame: trade.timeFrame,
    exitPrice: trade.soldPrice,
    pnl: trade.pnl,
    commission: trade.commission,
    realisedPnl,
    win,
    winPercent,
    pnlPercent: parseFloat(pnlPercent.toFixed(2)),
    rsAtWork,
  };
};

const useStockStore = create<StockStoreState>((set) => ({
  trades: [],
  loading: false,
  error: null,

  fetchTrades: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get("http://localhost:8080/api/stock");

      const mappedTrades = response.data.trades.map(mapBackendToFrontend);
      const summary = response.data.stocksSummary;

      set({
        trades: mappedTrades,
        summary,
        loading: false,
      });
    } catch (err) {
      console.error(err);
      set({ error: "Failed to fetch trades", loading: false });
    }
  },

  addTrade: async (tradeData: any) => {
    try {
      set({ loading: true, error: null });

      const formData = new FormData();
      formData.append("entryDate", tradeData.entryDate.toISOString());
      formData.append("exitDate", tradeData.exitDate.toISOString());
      formData.append("symbol", tradeData.symbol);
      formData.append("quantity", tradeData.quantity.toString());
      formData.append("boughtPrice", tradeData.boughtPrice.toString());
      formData.append("timeFrame", tradeData.timeFrame);
      formData.append("soldPrice", tradeData.soldPrice.toString());
      formData.append("pnl", tradeData.pnl.toString());
      formData.append("commission", tradeData.commission.toString());
      formData.append("notes", tradeData.notes);
      if (tradeData.tradeImage) {
        formData.append("tradeImage", tradeData.tradeImage);
      }

      await axios.post("http://localhost:8080/api/stock", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await useStockStore.getState().fetchTrades();

      set({ loading: false });
    } catch (err) {
      console.error(err);
      set({ error: "Failed to add trade", loading: false });
    }
  },
}));

export default useStockStore;
