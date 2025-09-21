import {
  TrendingUp,
  TrendingDown,
  BarChart2,
  DollarSign,
  Receipt,
  Target,
  Percent,
  Trophy,
  AlertTriangle,
  Award,
  Activity,
} from "lucide-react";
import { useTheme } from "@mui/material/styles";
import StatCard from "../../ui-components/StatCard";

const TradingStatsDashboard = ({ tradingStats }: { tradingStats: any }) => {
  const theme = useTheme();
  const isProfit = tradingStats?.totalReturn > 0;
  const isNetProfit = tradingStats?.netReturn > 0;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "24px",
      }}
    >
      <StatCard
        title="Total Trades"
        value={tradingStats?.numberOfTrades}
        chipLabel="All Positions"
        icon={<BarChart2 size={20} />}
        color={theme.palette.primary.main}
      />

      <StatCard
        title="Winning Trades"
        value={tradingStats?.winningTrades}
        chipLabel={`Win Rate - ${tradingStats?.winRate}%`}
        icon={<TrendingUp size={20} />}
        color={theme.palette.success.medium}
      />

      <StatCard
        title="Losing Trades"
        value={tradingStats?.losingTrades}
        chipLabel={`Loss Rate - ${tradingStats?.lossRate}%`}
        icon={<TrendingDown size={20} />}
        color={theme.palette.error.medium}
      />

      <StatCard
        title="Draw Down"
        value={`${tradingStats?.maxDrawdown} %`}
        chipLabel="Diff bet high and low"
        icon={<Activity size={20} />}
        color={theme.palette.grey[500]}
      />

      <StatCard
        title="Total Return"
        value={`₹ ${tradingStats?.totalReturn.toLocaleString()}`}
        chipLabel={
          isProfit
            ? `Profit - ${tradingStats?.returnPercentage}%`
            : `Loss ${tradingStats?.returnPercentage}%`
        }
        icon={<DollarSign size={20} />}
        color={
          isProfit ? theme.palette.success.medium : theme.palette.error.medium
        }
      />

      <StatCard
        title="Net Return"
        value={`₹ ${tradingStats?.netReturn.toLocaleString()}`}
        chipLabel={isNetProfit ? "After Commission" : "Net Loss"}
        icon={<Target size={20} />}
        color={
          isNetProfit
            ? theme.palette.success.medium
            : theme.palette.error.medium
        }
      />

      <StatCard
        title="Total Commission"
        value={`₹ ${tradingStats?.totalCommission.toLocaleString()}`}
        chipLabel="Fees Paid"
        icon={<Receipt size={20} />}
        color={theme.palette.warning.light}
      />

      <StatCard
        title="Profit Factor"
        value={tradingStats?.profitFactor}
        chipLabel="Risk-Reward Ratio"
        icon={<Percent size={20} />}
        color={theme.palette.info.main}
      />

      <StatCard
        title="Average Win"
        value={`₹ ${tradingStats?.avgWin.toLocaleString()}`}
        chipLabel="Per Winning Trade"
        icon={<Trophy size={20} />}
        color={theme.palette.success.medium}
      />

      <StatCard
        title="Average Loss"
        value={`₹ ${Math.abs(tradingStats?.avgLoss).toLocaleString()}`}
        chipLabel="Per Losing Trade"
        icon={<AlertTriangle size={20} />}
        color={theme.palette.error.medium}
      />

      <StatCard
        title="Average Trade"
        value={`₹ ${tradingStats?.avgTrade.toLocaleString()}`}
        chipLabel="Overall Average"
        icon={<BarChart2 size={20} />}
        color={theme.palette.primary.main}
      />

      {/* <StatCard
        title="Avg Holding Period"
        value={`${tradingStats?.avgHoldingPeriod} days`}
        chipLabel="Average Duration"
        icon={<Clock size={20} />}
        color={theme.palette.info.main}
      /> */}

      <StatCard
        title="Largest Win"
        value={`₹ ${tradingStats?.largestWin.toLocaleString()}`}
        chipLabel="Best Trade"
        icon={<Award size={20} />}
        color={theme.palette.success.medium}
      />

      <StatCard
        title="Largest Loss"
        value={`₹ ${Math.abs(tradingStats?.largestLoss).toLocaleString()}`}
        chipLabel="Worst Trade"
        icon={<TrendingDown size={20} />}
        color={theme.palette.error.medium}
      />

      <StatCard
        title="Max Consecutive Wins"
        value={tradingStats?.maxConsecutiveWins}
        chipLabel="Winning Streak"
        icon={<TrendingUp size={20} />}
        color={theme.palette.success.medium}
      />

      <StatCard
        title="Max Consecutive Losses"
        value={tradingStats?.maxConsecutiveLosses}
        chipLabel="Losing Streak"
        icon={<TrendingDown size={20} />}
        color={theme.palette.error.medium}
      />
    </div>
  );
};

export default TradingStatsDashboard;
