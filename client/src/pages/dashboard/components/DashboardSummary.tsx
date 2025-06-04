import { TrendingUp, ArrowUpRight, Percent, Wallet } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import TradeFrequencyChart from "./TradeFrequencyChart";

export function DashboardSummary() {
  const totalInvestment = "₹5,00,000";
  const totalReturns = "₹57,800";
  const winRate = "68%";
  const totalTrades = "132";

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-stretch min-h-[300px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4  w-full lg:w-[40%]">
        <StatCard
          title="Total Investment"
          value={totalInvestment}
          change="+12.5% Since last month"
          label="Monthly"
          icon={<Wallet className="w-8 h-8 text-indigo-600" />}
        />
        <StatCard
          title="Total Returns"
          value={totalReturns}
          change="+7.3% Since last quarter"
          label="Quarterly"
          icon={<TrendingUp className="w-8 h-8 text-green-600" />}
        />
        <StatCard
          title="Win Percentage"
          value={winRate}
          change="+4% Since last 50 trades"
          label="Overall"
          icon={<Percent className="w-8 h-8 text-blue-600" />}
        />
        <StatCard
          title="Total Trades"
          value={totalTrades}
          change="+18 This month"
          label="Yearly"
          icon={<ArrowUpRight className="w-8 h-8 text-pink-600" />}
        />
      </div>
      <div className="bg-white flex-1 rounded-xl  flex items-center justify-center">
        <TradeFrequencyChart />
      </div>
    </div>
  );
}

type StatCardProps = {
  title: string;
  value: string;
  change: string;
  label: string;
  icon: React.ReactNode;
};

function StatCard({ title, value, change, label, icon }: StatCardProps) {
  const isReturnCard = title.toLowerCase().includes("returns");
  const isPositive = change.includes("+");

  const bgClass = isReturnCard
    ? isPositive
      ? "bg-gradient-to-br from-green-50 to-white"
      : "bg-gradient-to-br from-red-50 to-white"
    : "bg-gradient-to-br from-indigo-50 to-white";
  return (
    <Card
      className={`px-5 py-4 rounded-xl shadow-sm border border-gray-200 ${bgClass}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="text-md">{title}</div>
          <div className="mt-4 text-2xl font-bold text-gray-900">{value}</div>
          <div
            className={`text-sm mt-4 ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {change}
          </div>
        </div>
        <div className="flex flex-col items-center gap-1 space-y-4">
          <Badge variant="outline" className="bg-gray-100 text-xs px-2 py-0.5">
            {label}
          </Badge>
          {icon}
        </div>
      </div>
    </Card>
  );
}
