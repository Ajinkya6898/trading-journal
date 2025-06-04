import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const portfolioData = [
  {
    title: "Stocks",
    ringColor: "#4f46e5",
    investment: 565694,
    currentValue: 695276.75,
    profit: 129582.75,
    profitPercent: 22.91,
    progress: 70,
  },
  {
    title: "Mutual Funds",
    ringColor: "#f97316",
    investment: 0,
    currentValue: 0,
    profit: 0,
    profitPercent: 0,
    progress: 70,
  },
  {
    title: "ETFs",
    ringColor: "#455a64",
    investment: 0,
    currentValue: 0,
    profit: 0,
    profitPercent: 0,
    progress: 30,
  },

  {
    title: "Crypto",
    ringColor: "#1de9b6",
    investment: 0,
    currentValue: 0,
    profit: 0,
    profitPercent: 10,
    progress: 5,
  },
];

export default function PortfolioDistribution() {
  return (
    <>
      <h2 className="text-xl font-semibold">Portfolio Distribution</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {portfolioData.map((item) => (
          <Card key={item.title} className="shadow-md h-full">
            <CardContent className="flex items-center justify-between h-full py-2">
              <div className="space-y-2 text-sm">
                <h3 className="text-lg font-bold border-l-4 border-[#6366f1] pl-2">
                  {item.title}
                </h3>
                <p>
                  <span>Investment:</span> ₹
                  {item.investment.toLocaleString("en-IN")}
                </p>
                <p>
                  <span>Current Value:</span> ₹
                  {item.currentValue.toLocaleString("en-IN")}
                </p>
                <p>
                  <span>Profit:</span>{" "}
                  <span
                    className={cn(
                      item.profit >= 0 ? "text-green-600" : "text-red-600"
                    )}
                  >
                    ₹{item.profit.toLocaleString("en-IN")}
                  </span>
                </p>
                <p>
                  <span>Profit %:</span>{" "}
                  <span
                    className={cn(
                      item.profitPercent >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    )}
                  >
                    {item.profitPercent.toFixed(2)}%
                  </span>
                </p>
              </div>

              {/* Ring Progress */}
              <div className="flex flex-col items-center gap-1">
                <div className="relative w-24 h-24">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `conic-gradient(${
                        item.progress > 0 ? item.ringColor : "#e5e7eb"
                      } ${item.progress}%, #e5e7eb ${item.progress}% 100%)`,
                    }}
                  />
                  <div className="absolute inset-[15px] rounded-full bg-white flex items-center justify-center text-xs font-semibold">
                    <p className="text-base">{item.progress.toFixed(0)}%</p>
                  </div>
                </div>
                <p className="text-xs mt-1">of Total</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
