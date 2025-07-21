const mongoose = require("mongoose");

const positionEntrySchema = new mongoose.Schema(
  {
    stockName: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    investAmount: { type: Number, required: true },
    stockPrice: { type: Number, required: true },
    positionSize: { type: Number, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PositionEntry", positionEntrySchema);
