const StockEntry = require("../model/StocksSchema");
const FundTransaction = require("../model/FundTransaction");
const MutualFundEntry = require("../model/MutualFundSchema");

const getMonthlyTradeStats = async (req, res) => {
  try {
    const trades = await StockEntry.find().sort({ entryDate: -1 });

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

const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;

    // STOCKS
    const fundTransactions = await FundTransaction.find({ userId });
    const trades = await StockEntry.find({ userId }).sort({ entryDate: -1 });

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

    const monthlyTradeStats = monthsData
      .reverse()
      .map(({ monthKey, count }) => ({
        month: monthKey,
        tradeCount: count,
      }));

    // MUTUAL FUND
    const mutualFundEntries = await MutualFundEntry.find({ userId });
    const stockTotal = fundTransactions.reduce((sum, transaction) => {
      if (transaction.type === "Add") {
        return sum + (transaction.amount || 0);
      } else if (transaction.type === "Withdraw") {
        return sum - (transaction.amount || 0);
      }
      return sum;
    }, 0);
    const mutualFundTotal = mutualFundEntries.reduce(
      (sum, e) => sum + (e.amount || 0),
      0
    );
    const cryptoTotal = 0;
    const etfTotal = 0;

    const totalInvested = stockTotal + mutualFundTotal + cryptoTotal + etfTotal;

    const doughnutData = {
      datasets: [
        {
          data: [
            ((stockTotal / totalInvested) * 100).toFixed(2),
            ((mutualFundTotal / totalInvested) * 100).toFixed(2),
            ((cryptoTotal / totalInvested) * 100).toFixed(2),
            ((etfTotal / totalInvested) * 100).toFixed(2),
          ],
        },
      ],
    };

    res.status(200).json({
      monthlyTradeStats,
      doughnutData,
      totalInvested,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Error fetching dashboard data" });
  }
};

module.exports = { getMonthlyTradeStats, getDashboardData };
