const mongoose = require("mongoose");

const mutualFundTransactionSchema = new mongoose.Schema(
  {
    fundName: { type: String, required: true },
    date: { type: Date, required: true },
    units: { type: Number, required: true },
    nav: { type: Number, required: true },
    amount: { type: Number, required: true },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "MutualFundTransaction",
  mutualFundTransactionSchema
);
