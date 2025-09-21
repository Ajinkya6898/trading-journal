const StockEntry = require("../model/StocksSchema");
const FundTransaction = require("../model/FundTransaction");
const MutualFundEntry = require("../model/MutualFundSchema");

exports.getCommonData = async (req, res) => {
  try {
    const userId = req.user._id;
    const [fundTransactions, allTrades] = await Promise.all([
      FundTransaction.find({ userId }),
      StockEntry.find({ userId }).sort({ entryDate: -1 }),
    ]);

    const totalCapital = fundTransactions.reduce((sum, transaction) => {
      if (transaction.type === "Add") {
        return sum + (transaction.amount || 0);
      } else if (transaction.type === "Withdraw") {
        return sum - (transaction.amount || 0);
      }
      return sum;
    }, 0);

    const totalReturn = allTrades.reduce(
      (sum, trade) => sum + (trade.pnl || 0),
      0
    );
    const totalCommission = allTrades.reduce(
      (sum, trade) => sum + (trade.commission || 0),
      0
    );
    const netReturn = totalReturn - totalCommission;
    const totalReturns = totalCapital + netReturn;

    res.status(200).json({
      totalCapital: totalReturns,
    });
  } catch (error) {
    console.error("Error fetching common data:", error);
    res.status(500).json({ message: "Server error" });
  }
};
