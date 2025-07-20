const StockEntry = require("../model/StocksSchema");

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

    // Calculate summary
    const numberOfTrades = trades.length;
    const winningTrades = trades.filter((trade) => trade.pnl > 0).length;
    const losingTrades = trades.filter((trade) => trade.pnl < 0).length;
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

    const stocksSummary = {
      numberOfTrades,
      winningTrades,
      losingTrades,
      winRate,
      lossRate,
      totalReturn,
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
