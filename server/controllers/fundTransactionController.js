const FundTransaction = require("../model/FundTransaction");

// @desc Add a new fund transaction
exports.addTransaction = async (req, res) => {
  try {
    const { date, type, amount, account } = req.body;

    const newTransaction = new FundTransaction({
      userId: req.user._id,
      date,
      type,
      amount,
      account,
    });

    await newTransaction.save();
    res.status(201).json({ message: "Transaction added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add transaction" });
  }
};

exports.getAllTransactions = async (req, res) => {
  try {
    const { broker, type, startDate, endDate } = req.query;

    const filter = {};

    // Broker filter (account)
    if (broker && broker !== "All") {
      filter.account = broker;
    }

    // Type filter
    if (type && type !== "All") {
      filter.type = type;
    }

    // Date range filter
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) {
        filter.date.$gte = new Date(startDate);
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        filter.date.$lte = end;
      }
    }

    const transactions = await FundTransaction.find(filter).sort({ date: -1 });

    res.status(200).json({ transactions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};
