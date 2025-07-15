import { TrendingUp, TrendingDown, BarChart3, DollarSign } from "lucide-react";

const TradingSummaryCard = ({ data }) => {
  // Default data for demonstration
  const defaultData = {
    numberOfTrades: 4,
    winningTrades: 3,
    losingTrades: 1,
    totalReturn: 6291.16,
  };

  const summaryData = data || defaultData;

  // Calculate win rate
  const winRate =
    summaryData.numberOfTrades > 0
      ? (
          (summaryData.winningTrades / summaryData.numberOfTrades) *
          100
        ).toFixed(1)
      : 0;

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Determine return color and status
  const isProfit = summaryData.totalReturn >= 0;

  const StatCard = ({
    icon: Icon,
    title,
    value,
    chipLabel,
    chipColor = "bg-blue-100 text-blue-800",
    iconColor = "text-blue-600",
    iconBgColor = "bg-blue-50",
  }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
      <div className="flex items-center mb-3">
        <div
          className={`w-8 h-8 rounded-full ${iconBgColor} flex items-center justify-center mr-3`}
        >
          <Icon className={`w-4 h-4 ${iconColor}`} />
        </div>
        <div className="flex-1">
          <p className="text-xs text-gray-500 mb-1">{title}</p>
          <p className="text-lg font-semibold text-gray-900">{value}</p>
        </div>
      </div>

      <div
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${chipColor}`}
      >
        {chipLabel}
      </div>
    </div>
  );

  return (
    <div className="w-full mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={BarChart3}
          title="Total Trades"
          value={summaryData.numberOfTrades}
          chipLabel="All Positions"
          chipColor="bg-blue-100 text-blue-800"
          iconColor="text-blue-600"
          iconBgColor="bg-blue-50"
        />

        <StatCard
          icon={TrendingUp}
          title="Winning Trades"
          value={summaryData.winningTrades}
          chipLabel={`${winRate}% win rate`}
          chipColor="bg-green-100 text-green-800"
          iconColor="text-green-600"
          iconBgColor="bg-green-50"
        />

        <StatCard
          icon={TrendingDown}
          title="Losing Trades"
          value={summaryData.losingTrades}
          chipLabel={`${(100 - winRate).toFixed(1)}% loss rate`}
          chipColor="bg-red-100 text-red-800"
          iconColor="text-red-600"
          iconBgColor="bg-red-50"
        />

        <StatCard
          icon={DollarSign}
          title="Total Return"
          value={formatCurrency(summaryData.totalReturn)}
          chipLabel={isProfit ? "Profit" : "Loss"}
          chipColor={
            isProfit ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }
          iconColor={isProfit ? "text-green-600" : "text-red-600"}
          iconBgColor={isProfit ? "bg-green-50" : "bg-red-50"}
        />
      </div>
    </div>
  );
};

export default TradingSummaryCard;
