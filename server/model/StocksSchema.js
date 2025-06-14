const mongoose = require("mongoose");

const StockEntrySchema = new mongoose.Schema({
  entryDate: { type: Date, required: true },
  exitDate: { type: Date, required: true },
  symbol: { type: String, required: true },
  quantity: { type: Number, required: true },
  boughtPrice: { type: Number, required: true },
  soldPrice: { type: Number, required: true },
  pnl: { type: Number, required: true },
  commission: { type: Number, required: true },
  notes: { type: String },
  tradeImage: { type: String },
});

module.exports = mongoose.model("StockEntry", StockEntrySchema);
