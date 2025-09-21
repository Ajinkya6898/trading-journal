const mongoose = require("mongoose");

const positionEntrySchema = new mongoose.Schema(
  {
    stockName: { type: String, required: true },
    investAmount: { type: Number, required: true },
    stockPrice: { type: Number, required: true },
    positionSize: { type: Number, required: true },

    atr: { type: Number, required: true },
    atrMultiplier: { type: Number, required: true },
    partialTarget: { type: Number, required: true },

    partialSellQty: { type: Number, required: true },
    hardsl: { type: Number, required: true },

    exitReturnPercent: { type: Number, required: true },
    exitPrice: { type: Number, required: true },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PositionEntry", positionEntrySchema);
