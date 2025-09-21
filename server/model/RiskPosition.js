const mongoose = require("mongoose");

const RiskPositionSchema = new mongoose.Schema(
  {
    stockName: { type: String, required: true },
    totalCapital: { type: Number, required: true }, // initial capital + returns
    riskPercent: { type: Number, required: true }, // e.g. 0.5, 1, 1.5, 2
    riskAmount: { type: Number, required: true }, // calculated

    entryPrice: { type: Number, required: true },
    stopLossPrice: { type: Number, required: true },
    positionSize: { type: Number, required: true }, // qty

    atr: { type: Number },
    atrMultiplier: { type: Number, default: 1 },
    partialTarget: { type: Number }, // price where partial booking happens
    partialPercent: { type: Number, default: 20 }, // % to sell
    partialSellQty: { type: Number },

    hardsl: { type: Number }, // hard stop loss
    exitReturnPercent: { type: Number, default: 7 }, // 5–20%
    exitPrice: { type: Number }, // price where full exit happens
  },
  { timestamps: true }
);

module.exports = mongoose.model("RiskPosition", RiskPositionSchema);
