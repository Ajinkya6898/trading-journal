const mongoose = require("mongoose");

const DashboardStatsSchema = new mongoose.Schema({
  month: String,
  tradeCount: Number,
});

module.exports = mongoose.model("DashboardStats", DashboardStatsSchema);
