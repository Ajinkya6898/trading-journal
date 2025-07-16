const StockEntry = require("../model/StocksSchema");

const getMonthlyTradeStats = async (req, res) => {
  try {
    const trades = await StockEntry.find().sort({ entryDate: -1 });
    console.log("trades", trades);

    const currentDate = new Date();
    const monthsData = Array.from({ length: 12 }).map((_, i) => {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - i,
        1
      );
      const monthKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;
      return { monthKey, count: 0 };
    });

    trades.forEach((trade) => {
      const date = new Date(trade.entryDate);
      const tradeMonthKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;
      const match = monthsData.find((m) => m.monthKey === tradeMonthKey);
      if (match) match.count += 1;
    });

    const result = monthsData.reverse().map(({ monthKey, count }) => ({
      month: monthKey,
      tradeCount: count,
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ message: "Error fetching dashboard stats" });
  }
};

module.exports = { getMonthlyTradeStats };
