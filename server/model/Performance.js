const mongoose = require("mongoose");

const PerformanceSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    totalReturnPercent: { type: Number, default: 0 },
    totalPnL: { type: Number, default: 0 },
    goalId: { type: Schema.Types.ObjectId, ref: "Goal" },
    portfolioGrowth: [
      {
        month: { type: String },
        value: { type: Number },
      },
    ],
    monthlyReturns: [
      {
        month: { type: String },
        pnl: { type: Number },
      },
    ],
    bestTrade: {
      symbol: { type: String },
      pnl: { type: Number },
    },
    worstTrade: {
      symbol: { type: String },
      pnl: { type: Number },
    },
    winRate: { type: Number },
    maxDrawdown: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Performance", PerformanceSchema);
