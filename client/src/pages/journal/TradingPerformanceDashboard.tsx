import { TrendingUp, TrendingDown, BarChart2, DollarSign } from "lucide-react";
import { Typography } from "@mui/material";
import StatCard from "../../ui-components/StatCard";

const TradingPerformanceDashboard = ({ data }) => {
  const summaryData = data;

  const winRate =
    summaryData?.numberOfTrades > 0
      ? (
          (summaryData?.winningTrades / summaryData?.numberOfTrades) *
          100
        ).toFixed(1)
      : 0;

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const isProfit = summaryData?.totalReturn >= 0;

  return (
    <>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <Typography variant="h1" color="#3f51b5">
          Trading Performance
        </Typography>
        <p
          style={{
            fontSize: "16px",
            color: "#666",
            fontWeight: "400",
          }}
        >
          Real-time overview of your trading activity
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "24px",
          marginBottom: "32px",
        }}
      >
        <StatCard
          title="Total Trades"
          value={summaryData?.numberOfTrades}
          chipLabel="All Positions"
          icon={<BarChart2 size={20} />}
          color="#3b82f6"
        />
        <StatCard
          title="Winning Trades"
          value={summaryData?.winningTrades}
          chipLabel={`${winRate}% win rate`}
          icon={<TrendingUp size={20} />}
          color="#22c55e"
        />
        <StatCard
          title="Losing Trades"
          value={summaryData?.losingTrades}
          chipLabel={`${(100 - +winRate).toFixed(1)}% loss rate`}
          icon={<TrendingDown size={20} />}
          color="#ef4444"
        />
        <StatCard
          title="Total Return"
          value={`₹ ${summaryData?.totalReturn.toLocaleString()}`}
          chipLabel={isProfit ? "✨ Profit" : "⚠️ Loss"}
          icon={<DollarSign size={20} />}
          color={isProfit ? "#22c55e" : "#ef4444"}
        />
      </div>

      <div
        style={{
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
          borderRadius: "16px",
          padding: "24px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "24px",
          border: "1px solid #e2e8f0",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#3b82f6",
              marginBottom: "4px",
            }}
          >
            {winRate}%
          </div>
          <div
            style={{ fontSize: "14px", color: "#64748b", fontWeight: "500" }}
          >
            Success Rate
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#1e293b",
              marginBottom: "4px",
            }}
          >
            {summaryData?.numberOfTrades > 0
              ? formatCurrency(
                  summaryData?.totalReturn / summaryData?.numberOfTrades
                )
              : "$0.00"}
          </div>
          <div
            style={{ fontSize: "14px", color: "#64748b", fontWeight: "500" }}
          >
            Avg P&L per Trade
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: isProfit ? "#22c55e" : "#ef4444",
              marginBottom: "4px",
            }}
          >
            {isProfit ? "+" : ""}
            {(
              (summaryData?.totalReturn /
                Math.max(summaryData?.numberOfTrades, 1)) *
              0.1
            ).toFixed(2)}
            %
          </div>
          <div
            style={{ fontSize: "14px", color: "#64748b", fontWeight: "500" }}
          >
            Return Rate
          </div>
        </div>
      </div>
    </>
  );
};

export default TradingPerformanceDashboard;
