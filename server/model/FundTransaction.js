const mongoose = require("mongoose");

const fundTransactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    enum: ["Add", "Withdraw"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  account: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("FundTransaction", fundTransactionSchema);
