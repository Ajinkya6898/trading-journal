import {
  ArrowDownRight,
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Card } from "@/components/ui/card";

const topPerformers = [
  { symbol: "TCS", return: 12.5 },
  { symbol: "INFY", return: 9.2 },
  { symbol: "RELIANCE", return: 7.8 },
];

const worstPerformers = [
  { symbol: "ADANIENT", return: -6.4 },
  { symbol: "PAYTM", return: -5.3 },
  { symbol: "ZOMATO", return: -3.1 },
];

export default function TopPerformers() {
  return (
    <Card className="p-6 space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-6 h-6 text-green-700" />
          <h3 className="text-lg font-semibold">Top 3 Performers</h3>
        </div>
        <div className="space-y-3">
          {topPerformers.map((item) => (
            <div
              key={item.symbol}
              className="flex items-center justify-between bg-green-50 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <ArrowUpRight className="w-5 h-5 text-green-600" />
                </div>
                <span className="font-semibold text-gray-800">
                  {item.symbol}
                </span>
              </div>
              <span className="text-green-700 font-semibold">{`+${item.return}%`}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <TrendingDown className="w-6 h-6 text-red-600" />
          <h3 className="text-lg font-semibold">Top 3 Losers</h3>
        </div>
        <div className="space-y-3">
          {worstPerformers.map((item) => (
            <div
              key={item.symbol}
              className="flex items-center justify-between bg-red-50 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-2 rounded-full">
                  <ArrowDownRight className="w-5 h-5 text-red-600" />
                </div>
                <span className="font-semibold text-gray-800">
                  {item.symbol}
                </span>
              </div>
              <span className="text-red-700 font-semibold">{`${item.return}%`}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
