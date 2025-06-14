const StockEntry = require("../model/StocksSchema");

const createTradeEntry = async (req, res) => {
  try {
    const {
      entryDate,
      exitDate,
      symbol,
      quantity,
      boughtPrice,
      soldPrice,
      pnl,
      commission,
      notes,
    } = req.body;

    const tradeImage = req.file ? req.file.filename : null;

    const newEntry = new StockEntry({
      entryDate,
      exitDate,
      symbol,
      quantity: Number(quantity),
      boughtPrice: Number(boughtPrice),
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
    const trades = await StockEntry.find().sort({ entryDate: -1 });
    res.json(trades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching trade entries" });
  }
};

module.exports = {
  createTradeEntry,
  getAllTradeEntries,
};
