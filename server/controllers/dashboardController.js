const StockEntry = require("../model/StocksSchema");
const FundTransaction = require("../model/FundTransaction");
const MutualFundEntry = require("../model/MutualFundSchema");

const getMonthlyTradeStats = async (req, res) => {
  try {
    const userId = req.user._id;
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
      return { monthKey, count: 0, pnl: 0 };
    });

    trades.forEach((trade) => {
      const date = new Date(trade.entryDate);
      const tradeMonthKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;
      const match = monthsData.find((m) => m.monthKey === tradeMonthKey);
      if (match) {
        match.count += 1;
        match.pnl += trade.pnl || 0;
      }
    });

    const result = monthsData.reverse().map(({ monthKey, count, pnl }) => ({
      month: monthKey,
      tradeCount: count,
      monthlyPnl: Number(pnl.toFixed(2)),
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching monthly trade stats:", error);
    res.status(500).json({ message: "Error fetching monthly trade stats" });
  }
};

const getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;
    const currentDate = new Date();
    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    const startOfToday = new Date(currentDate.setHours(0, 0, 0, 0));

    // Fetch all data
    const [fundTransactions, allTrades, mutualFundEntries] = await Promise.all([
      FundTransaction.find({ userId }),
      StockEntry.find({ userId }).sort({ entryDate: -1 }),
      MutualFundEntry.find({ userId }),
    ]);

    // === TRADING STATISTICS ===
    const numberOfTrades = allTrades.length;
    const winningTrades = allTrades.filter((t) => t.pnl > 0).length;
    const losingTrades = allTrades.filter((t) => t.pnl < 0).length;
    const breakEvenTrades = allTrades.filter((t) => t.pnl === 0).length;

    const winRate = numberOfTrades
      ? Number(((winningTrades / numberOfTrades) * 100).toFixed(2))
      : 0;
    const lossRate = numberOfTrades
      ? Number(((losingTrades / numberOfTrades) * 100).toFixed(2))
      : 0;

    const totalReturn = allTrades.reduce(
      (sum, trade) => sum + (trade.pnl || 0),
      0
    );
    const totalCommission = allTrades.reduce(
      (sum, trade) => sum + (trade.commission || 0),
      0
    );
    const netReturn = totalReturn - totalCommission;

    // Profit Factor
    const totalWinningReturn = allTrades
      .filter((t) => t.pnl > 0)
      .reduce((sum, t) => sum + t.pnl, 0);
    const totalLosingReturn = Math.abs(
      allTrades.filter((t) => t.pnl < 0).reduce((sum, t) => sum + t.pnl, 0)
    );
    const profitFactor =
      totalLosingReturn > 0
        ? Number((totalWinningReturn / totalLosingReturn).toFixed(2))
        : 0;

    // Average metrics
    const avgWin =
      winningTrades > 0
        ? Number((totalWinningReturn / winningTrades).toFixed(2))
        : 0;
    const avgLoss =
      losingTrades > 0
        ? Number((totalLosingReturn / losingTrades).toFixed(2))
        : 0;
    const avgTrade =
      numberOfTrades > 0
        ? Number((totalReturn / numberOfTrades).toFixed(2))
        : 0;
    const avgHoldingPeriod = calculateAvgHoldingPeriod(allTrades);

    // Risk metrics
    const largestWin =
      allTrades.length > 0 ? Math.max(...allTrades.map((t) => t.pnl || 0)) : 0;
    const largestLoss =
      allTrades.length > 0 ? Math.min(...allTrades.map((t) => t.pnl || 0)) : 0;
    const maxConsecutiveWins = calculateMaxConsecutive(allTrades, true);
    const maxConsecutiveLosses = calculateMaxConsecutive(allTrades, false);

    // === PERIOD-WISE ANALYSIS ===
    const todayTrades = filterTradesByDate(allTrades, startOfToday);
    const weekTrades = filterTradesByDate(allTrades, startOfWeek);
    const monthTrades = filterTradesByDate(allTrades, startOfMonth);
    const yearTrades = filterTradesByDate(allTrades, startOfYear);

    const periodStats = {
      today: calculatePeriodStats(todayTrades),
      thisWeek: calculatePeriodStats(weekTrades),
      thisMonth: calculatePeriodStats(monthTrades),
      thisYear: calculatePeriodStats(yearTrades),
    };

    // === MONTHLY TRADE ANALYSIS ===
    const currentYear = currentDate.getFullYear();
    const monthsData = Array.from({ length: 12 }).map((_, i) => {
      const date = new Date(currentYear, currentDate.getMonth() - i, 1);
      const monthKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;
      return { monthKey, count: 0, pnl: 0, wins: 0, losses: 0 };
    });

    allTrades.forEach((trade) => {
      const date = new Date(trade.entryDate);
      const tradeMonthKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;
      const match = monthsData.find((m) => m.monthKey === tradeMonthKey);
      if (match) {
        match.count += 1;
        match.pnl += trade.pnl || 0;
        if (trade.pnl > 0) match.wins += 1;
        else if (trade.pnl < 0) match.losses += 1;
      }
    });

    const monthlyTradeStats = monthsData
      .reverse()
      .map(({ monthKey, count, pnl, wins, losses }) => ({
        month: monthKey,
        tradeCount: count,
        monthlyPnl: Number(pnl.toFixed(2)),
        wins,
        losses,
        winRate: count > 0 ? Number(((wins / count) * 100).toFixed(2)) : 0,
      }));

    // === SYMBOL ANALYSIS ===
    const symbolStats = calculateSymbolStats(allTrades);

    // === TIMEFRAME ANALYSIS ===
    const timeFrameStats = calculateTimeFrameStats(allTrades);

    // === FUND MANAGEMENT ===
    const stockInvestment = fundTransactions.reduce((sum, transaction) => {
      if (transaction.type === "Add") {
        return sum + (transaction.amount || 0);
      } else if (transaction.type === "Withdraw") {
        return sum - (transaction.amount || 0);
      }
      return sum;
    }, 0);

    const mutualFundInvestment = mutualFundEntries.reduce(
      (sum, e) => sum + (e.amount || 0),
      0
    );
    const cryptoTotal = 0; // Placeholder for future implementation
    const etfTotal = 0; // Placeholder for future implementation

    const totalInvested =
      stockInvestment + mutualFundInvestment + cryptoTotal + etfTotal;
    const currentPortfolioValue = totalInvested + totalReturn;

    const returnPercentage =
      stockInvestment > 0
        ? Number(((totalReturn / stockInvestment) * 100).toFixed(2))
        : 0;

    // === PORTFOLIO ALLOCATION ===
    const doughnutData = {
      datasets: [
        {
          data:
            totalInvested > 0
              ? [
                  Number(((stockInvestment / totalInvested) * 100).toFixed(2)),
                  Number(
                    ((mutualFundInvestment / totalInvested) * 100).toFixed(2)
                  ),
                  Number(((cryptoTotal / totalInvested) * 100).toFixed(2)),
                  Number(((etfTotal / totalInvested) * 100).toFixed(2)),
                ]
              : [0, 0, 0, 0],
        },
      ],
      labels: ["Stocks", "Mutual Funds", "Crypto", "ETFs"],
    };

    // === RECENT ACTIVITY ===
    const recentTrades = allTrades.slice(0, 10);
    const recentFundTransactions = fundTransactions.slice(0, 5);

    // === GOAL TRACKING ===
    const monthlyTarget = 10000; // You can make this configurable
    const monthlyProgress = monthTrades.reduce(
      (sum, t) => sum + (t.pnl || 0),
      0
    );
    const targetProgress =
      monthlyTarget > 0
        ? Number(((monthlyProgress / monthlyTarget) * 100).toFixed(2))
        : 0;

    const response = {
      // Trading Performance
      tradingStats: {
        numberOfTrades,
        winningTrades,
        losingTrades,
        breakEvenTrades,
        winRate,
        lossRate,
        totalReturn: Number(totalReturn.toFixed(2)),
        netReturn: Number(netReturn.toFixed(2)),
        totalCommission: Number(totalCommission.toFixed(2)),
        profitFactor,
        avgWin,
        avgLoss,
        avgTrade,
        avgHoldingPeriod,
        largestWin: Number(largestWin.toFixed(2)),
        largestLoss: Number(largestLoss.toFixed(2)),
        maxConsecutiveWins,
        maxConsecutiveLosses,
        returnPercentage,
      },

      // Period Analysis
      periodStats,

      // Monthly Performance
      monthlyTradeStats,

      // Symbol Performance
      topPerformingSymbols: symbolStats.slice(0, 5),
      worstPerformingSymbols: symbolStats.slice(-5).reverse(),

      // TimeFrame Analysis
      timeFrameStats,

      // Portfolio Overview
      portfolioOverview: {
        totalInvested: Number(totalInvested.toFixed(2)),
        currentValue: Number(currentPortfolioValue.toFixed(2)),
        totalPnL: Number(totalReturn.toFixed(2)),
        stockInvestment: Number(stockInvestment.toFixed(2)),
        mutualFundInvestment: Number(mutualFundInvestment.toFixed(2)),
        returnPercentage,
      },

      // Portfolio Allocation
      doughnutData,

      // Recent Activity
      recentActivity: {
        recentTrades: recentTrades.map((trade) => ({
          symbol: trade.symbol,
          entryDate: trade.entryDate,
          pnl: trade.pnl,
          quantity: trade.quantity,
          timeFrame: trade.timeFrame,
        })),
        recentFundTransactions: recentFundTransactions.map((tx) => ({
          date: tx.date,
          type: tx.type,
          amount: tx.amount,
          account: tx.account,
        })),
      },

      // Goal Tracking
      goalTracking: {
        monthlyTarget,
        monthlyProgress: Number(monthlyProgress.toFixed(2)),
        targetProgress: Math.min(targetProgress, 100),
        remainingToTarget: Number(
          Math.max(monthlyTarget - monthlyProgress, 0).toFixed(2)
        ),
      },
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Error fetching dashboard data" });
  }
};

// Helper Functions
const filterTradesByDate = (trades, startDate) => {
  return trades.filter((trade) => new Date(trade.entryDate) >= startDate);
};

const calculatePeriodStats = (trades) => {
  const count = trades.length;
  const wins = trades.filter((t) => t.pnl > 0).length;
  const losses = trades.filter((t) => t.pnl < 0).length;
  const totalPnl = trades.reduce((sum, t) => sum + (t.pnl || 0), 0);
  const winRate = count > 0 ? Number(((wins / count) * 100).toFixed(2)) : 0;

  return {
    trades: count,
    wins,
    losses,
    winRate,
    totalPnl: Number(totalPnl.toFixed(2)),
  };
};

const calculateAvgHoldingPeriod = (trades) => {
  const tradesWithExit = trades.filter((t) => t.exitDate);
  if (tradesWithExit.length === 0) return 0;

  const totalDays = tradesWithExit.reduce((sum, trade) => {
    const entry = new Date(trade.entryDate);
    const exit = new Date(trade.exitDate);
    const days = Math.abs((exit - entry) / (1000 * 60 * 60 * 24));
    return sum + days;
  }, 0);

  return Number((totalDays / tradesWithExit.length).toFixed(1));
};

const calculateMaxConsecutive = (trades, isWin) => {
  if (trades.length === 0) return 0;

  let maxStreak = 0;
  let currentStreak = 0;

  trades.forEach((trade) => {
    const condition = isWin ? trade.pnl > 0 : trade.pnl < 0;
    if (condition) {
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  });

  return maxStreak;
};

const calculateSymbolStats = (trades) => {
  const symbolMap = {};

  trades.forEach((trade) => {
    if (!symbolMap[trade.symbol]) {
      symbolMap[trade.symbol] = {
        symbol: trade.symbol,
        trades: 0,
        wins: 0,
        losses: 0,
        totalPnl: 0,
        totalVolume: 0,
      };
    }

    const stats = symbolMap[trade.symbol];
    stats.trades++;
    stats.totalPnl += trade.pnl || 0;
    stats.totalVolume += (trade.quantity || 0) * (trade.boughtPrice || 0);

    if (trade.pnl > 0) stats.wins++;
    else if (trade.pnl < 0) stats.losses++;
  });

  return Object.values(symbolMap)
    .map((stats) => ({
      ...stats,
      winRate:
        stats.trades > 0
          ? Number(((stats.wins / stats.trades) * 100).toFixed(2))
          : 0,
      avgPnl:
        stats.trades > 0
          ? Number((stats.totalPnl / stats.trades).toFixed(2))
          : 0,
      totalPnl: Number(stats.totalPnl.toFixed(2)),
      totalVolume: Number(stats.totalVolume.toFixed(2)),
    }))
    .sort((a, b) => b.totalPnl - a.totalPnl);
};

const calculateTimeFrameStats = (trades) => {
  const timeFrameMap = {};

  trades.forEach((trade) => {
    const tf = trade.timeFrame || "Unknown";
    if (!timeFrameMap[tf]) {
      timeFrameMap[tf] = {
        timeFrame: tf,
        trades: 0,
        wins: 0,
        losses: 0,
        totalPnl: 0,
      };
    }

    const stats = timeFrameMap[tf];
    stats.trades++;
    stats.totalPnl += trade.pnl || 0;

    if (trade.pnl > 0) stats.wins++;
    else if (trade.pnl < 0) stats.losses++;
  });

  return Object.values(timeFrameMap).map((stats) => ({
    ...stats,
    winRate:
      stats.trades > 0
        ? Number(((stats.wins / stats.trades) * 100).toFixed(2))
        : 0,
    totalPnl: Number(stats.totalPnl.toFixed(2)),
  }));
};

module.exports = {
  getMonthlyTradeStats,
  getDashboardData,
};
