const Goal = require("../model/Goal");
const StockEntry = require("../model/StocksSchema");
const FundTransaction = require("../model/FundTransaction");

// Create a new goal
const createGoal = async (req, res) => {
  try {
    const { startDate, endDate, targetReturnPercent } = req.body;
    const userId = req.user._id;

    // Check if an active goal already exists
    const activeGoal = await Goal.findOne({ userId, status: "active" });
    if (activeGoal) {
      return res
        .status(400)
        .json({ message: "You already have an active goal." });
    }

    // Get user's current portfolio size from funds + P&L
    const fundTransactions = await FundTransaction.find({ userId });
    const netInvestedAmount = fundTransactions.reduce((sum, tx) => {
      if (tx.type === "Add") return sum + tx.amount;
      if (tx.type === "Withdraw") return sum - tx.amount;
      return sum;
    }, 0);

    const trades = await StockEntry.find({ userId });
    const totalPnL = trades.reduce((sum, t) => sum + (t.pnl || 0), 0);

    const portfolioSize = netInvestedAmount;

    const amountToEarn = portfolioSize * (targetReturnPercent / 100);

    const newGoal = new Goal({
      userId,
      startDate,
      endDate,
      targetReturnPercent,
      goalAmount: amountToEarn,
    });

    await newGoal.save();

    return res.status(201).json(newGoal);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error here" });
  }
};

const getGoalProgress = async (req, res) => {
  try {
    const userId = req.user._id;

    const activeGoal = await Goal.findOne({ userId, status: "active" });
    if (!activeGoal) {
      return res.json({
        message:
          "No active goal found. Please create a new goal to get started.",
        goalActive: false,
      });
    }

    // Fetch all fund transactions
    const fundTransactions = await FundTransaction.find({ userId });
    const netInvestedAmount = fundTransactions.reduce((sum, tx) => {
      if (tx.type === "Add") return sum + tx.amount;
      if (tx.type === "Withdraw") return sum - tx.amount;
      return sum;
    }, 0);

    // Fetch all trades
    const trades = await StockEntry.find({ userId });
    const totalPnL = trades.reduce((sum, t) => sum + (t.pnl || 0), 0);

    const totalReturnPercent = netInvestedAmount
      ? Number(((totalPnL / netInvestedAmount) * 100).toFixed(2))
      : 0;

    const remainingAmount = Math.max(
      activeGoal.goalAmount - (netInvestedAmount + totalPnL),
      0
    );
    const remainingPercent = Math.max(
      activeGoal.targetReturnPercent - totalReturnPercent,
      0
    );

    // --- Monthly distribution ---
    const start = new Date(activeGoal.startDate);
    const end = new Date(activeGoal.endDate);
    const months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth()) +
      1;

    const monthlyTargetPercent = Number(
      (activeGoal.targetReturnPercent / months).toFixed(2)
    );
    const monthlyTargetAmount = Number(
      (activeGoal.goalAmount / months).toFixed(2)
    );

    // Initialize month-wise earnings map
    const monthlyEarningsMap = {};

    trades.forEach((t) => {
      const tradeDate = new Date(t.entryDate); // ensure entryDate exists
      const key = `${tradeDate.getFullYear()}-${tradeDate.getMonth() + 1}`;
      if (!monthlyEarningsMap[key]) monthlyEarningsMap[key] = 0;
      monthlyEarningsMap[key] += t.pnl || 0;
    });

    const now = new Date();
    // Build monthly distribution with achieved status
    const monthlyDistribution = [];
    for (let i = 0; i < months; i++) {
      const monthDate = new Date(start.getFullYear(), start.getMonth() + i, 1);
      const key = `${monthDate.getFullYear()}-${monthDate.getMonth() + 1}`;
      const earned = monthlyEarningsMap[key] || 0;

      let status = "Pending"; // default
      if (earned >= monthlyTargetAmount) status = "Achieved";
      else if (
        monthDate.getFullYear() < now.getFullYear() ||
        (monthDate.getFullYear() === now.getFullYear() &&
          monthDate.getMonth() < now.getMonth())
      )
        status = "Not Achieved";

      monthlyDistribution.push({
        month: monthDate.toLocaleString("default", {
          month: "short",
          year: "numeric",
        }),
        targetPercent: monthlyTargetPercent,
        targetAmount: monthlyTargetAmount.toFixed(2),
        earned: earned.toFixed(2),
        status,
      });
    }

    return res.json({
      goalActive: true,
      startDate: activeGoal.startDate,
      endDate: activeGoal.endDate,
      targetReturnPercent: activeGoal.targetReturnPercent,
      goalAmount: activeGoal.goalAmount,
      moneyEarnedSoFar: totalPnL,
      returnsEarnedSoFar: totalReturnPercent,
      remainingAmount,
      remainingPercent,
      monthlyDistribution,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createGoal,
  getGoalProgress,
};
