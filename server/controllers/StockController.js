const StockEntry = require("../model/StocksSchema");
const FundTransaction = require("../model/FundTransaction");

const createTradeEntry = async (req, res) => {
  try {
    const {
      entryDate,
      exitDate,
      symbol,
      quantity,
      boughtPrice,
      timeFrame,
      soldPrice,
      pnl,
      commission,
      notes,
    } = req.body;

    const tradeImage = req.file ? req.file.filename : null;

    const newEntry = new StockEntry({
      userId: req.user._id,
      entryDate,
      exitDate,
      symbol,
      quantity: Number(quantity),
      boughtPrice: Number(boughtPrice),
      timeFrame,
      soldPrice: Number(soldPrice),
      pnl: Number(pnl),
      commission: Number(commission),
      notes,
      tradeImage,
    });

    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating trade entry" });
  }
};

const getAllTradeEntries = async (req, res) => {
  try {
    const { startDate, endDate, winLossType, tradeType } = req.query;

    const filter = { userId: req.user._id };

    // 1. Date Range Filter
    if (startDate || endDate) {
      filter.entryDate = {};
      if (startDate) {
        filter.entryDate.$gte = new Date(startDate);
      }
      if (endDate) {
        filter.entryDate.$lte = new Date(endDate);
      }
    }

    // 2. Win/Loss Filter
    if (winLossType === "Only Winners") {
      filter.pnl = { $gt: 0 };
    } else if (winLossType === "Only Losers") {
      filter.pnl = { $lt: 0 };
    }

    // 3. Trade Type Filter
    if (tradeType && tradeType !== "All") {
      filter.tradeType = tradeType;
    }

    const trades = await StockEntry.find(filter).sort({ entryDate: -1 });

    const numberOfTrades = trades.length;
    const winningTrades = trades.filter((t) => t.pnl > 0).length;
    const losingTrades = trades.filter((t) => t.pnl < 0).length;
    const winRate = numberOfTrades
      ? Number(((winningTrades / numberOfTrades) * 100).toFixed(2))
      : 0;
    const lossRate = numberOfTrades
      ? Number(((losingTrades / numberOfTrades) * 100).toFixed(2))
      : 0;

    const totalReturn = trades.reduce(
      (sum, trade) => sum + (trade.pnl || 0),
      0
    );

    const totalCommission = trades.reduce(
      (sum, trade) => sum + (trade.commission || 0),
      0
    );

    const totalWinningReturn = trades
      .filter((t) => t.pnl > 0)
      .reduce((sum, t) => sum + t.pnl, 0);
    const totalLosingReturn = Math.abs(
      trades.filter((t) => t.pnl < 0).reduce((sum, t) => sum + t.pnl, 0)
    );

    const profitFactor =
      totalLosingReturn > 0
        ? Number((totalWinningReturn / totalLosingReturn).toFixed(2))
        : 0;

    const fundFilter = { userId: req.user._id };

    if (startDate || endDate) {
      fundFilter.date = {};
      if (startDate) {
        fundFilter.date.$gte = new Date(startDate);
      }
      if (endDate) {
        fundFilter.date.$lte = new Date(endDate);
      }
    }

    const fundTransactions = await FundTransaction.find(fundFilter);

    const netInvestedAmount = fundTransactions.reduce((sum, transaction) => {
      if (transaction.type === "Add") {
        return sum + (transaction.amount || 0);
      } else if (transaction.type === "Withdraw") {
        return sum - (transaction.amount || 0);
      }
      return sum;
    }, 0);

    const returnPercentage =
      netInvestedAmount > 0
        ? Number(((totalReturn / netInvestedAmount) * 100).toFixed(2))
        : 0;

    const stocksSummary = {
      numberOfTrades,
      winningTrades,
      losingTrades,
      winRate,
      lossRate,
      totalReturn: Number(totalReturn.toFixed(2)),
      totalCommission: Number(totalCommission.toFixed(2)),
      profitFactor,
      returnPercentage,
    };

    res.json({ trades, stocksSummary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching trade entries" });
  }
};

module.exports = {
  createTradeEntry,
  getAllTradeEntries,
};
