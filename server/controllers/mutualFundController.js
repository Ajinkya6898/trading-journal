const MutualFundSchema = require("../model/MutualFundSchema");
exports.addMutualFundEntry = async (req, res) => {
  try {
    const { fundName, date, units, nav, amount } = req.body;

    if (!fundName || !date || !units || !nav || !amount) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const entry = new MutualFundSchema({
      fundName,
      date,
      units,
      nav,
      amount,
    });

    const saved = await entry.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Add Mutual Fund Entry Error:", error);
    res
      .status(500)
      .json({ message: "Server error while adding mutual fund entry" });
  }
};

exports.getMutualFundEntries = async (req, res) => {
  try {
    const entries = await MutualFundSchema.find().sort({ date: -1 });
    res.json(entries);
  } catch (error) {
    console.error("Get Mutual Fund Entries Error:", error);
    res.status(500).json({ message: "Failed to fetch entries" });
  }
};
