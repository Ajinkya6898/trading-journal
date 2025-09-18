import {
  TrendingUp,
  TrendingDown,
  BarChart2,
  DollarSign,
  Receipt,
} from "lucide-react";
import { useTheme } from "@mui/material/styles";
import StatCard from "../../ui-components/StatCard";

const TradingPerformanceDashboard = ({ data }: { data: any }) => {
  const summaryData = data;

  const theme = useTheme();
  const isProfit = summaryData?.totalReturn > 0;

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
        value={summaryData?.numberOfTrades}
        chipLabel="All Positions"
        icon={<BarChart2 size={20} />}
        color={theme.palette.primary.main}
      />
      <StatCard
        title="Winning Trades"
        value={summaryData?.winningTrades}
        chipLabel={`Winning Percentage - ${summaryData?.winRate} %`}
        icon={<TrendingUp size={20} />}
        color={theme.palette.success.medium}
      />
      <StatCard
        title="Losing Trades"
        value={summaryData?.losingTrades}
        chipLabel={`Loss Percentage - ${summaryData?.lossRate} %`}
        icon={<TrendingDown size={20} />}
        color={theme.palette.error.medium}
      />
      <StatCard
        title="Total Commission"
        value={`₹ ${summaryData?.totalCommission.toLocaleString()}`}
        chipLabel="Fees Paid"
        icon={<Receipt size={20} />}
        color={theme.palette.warning.light}
      />
      <StatCard
        title="Total Return"
        value={`₹ ${summaryData?.totalReturn.toLocaleString()}`}
        chipLabel={
          isProfit
            ? `Profit - ${summaryData?.returnPercentage} %`
            : `Loss ${summaryData?.returnPercentage} %`
        }
        icon={<DollarSign size={20} />}
        color={
          isProfit ? theme.palette.success.medium : theme.palette.error.medium
        }
      />
    </div>
  );
};

export default TradingPerformanceDashboard;
