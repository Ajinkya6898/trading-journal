import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const portfolioData = [
  {
    title: "Stocks",
    color: "text-purple-600",
    ring: "ring-purple-200",
    investment: 565694,
    currentValue: 695276.75,
    profit: 129582.75,
    profitPercent: 22.91,
    progress: 100,
  },
  {
    title: "ETFs",
    color: "text-sky-500",
    ring: "ring-sky-100",
    investment: 0,
    currentValue: 0,
    profit: 0,
    profitPercent: 0,
    progress: 0,
  },
  {
    title: "Mutual Funds",
    color: "text-orange-500",
    ring: "ring-orange-100",
    investment: 0,
    currentValue: 0,
    profit: 0,
    profitPercent: 0,
    progress: 0,
  },
  {
    title: "Crypto",
    color: "text-orange-500",
    ring: "ring-orange-100",
    investment: 0,
    currentValue: 0,
    profit: 0,
    profitPercent: 0,
    progress: 0,
  },
];

export default function PortfolioDistribution() {
  return (
    <>
      <h2 className="text-xl font-semibold">Portfolio Distribution</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {portfolioData.map((item) => (
          <Card key={item.title} className="shadow-md h-full">
            <CardContent className="flex items-center justify-between h-full">
              <div className="space-y-2 text-sm">
                <h3
                  className={cn(
                    "text-md font-medium border-l-2 pl-2",
                    item.color
                  )}
                >
                  {item.title}
                </h3>
                <p className="pt-1">
                  <span className="text-muted-foreground">Investment:</span> ₹
                  {item.investment.toLocaleString("en-IN")}
                </p>
                <p className="pt-1">
                  <span className="text-muted-foreground">Current Value:</span>{" "}
                  ₹{item.currentValue.toLocaleString("en-IN")}
                </p>
                <p className="pt-1">
                  <span className="text-muted-foreground">Profit:</span>{" "}
                  <span
                    className={cn(
                      item.profit >= 0 ? "text-green-600" : "text-red-600"
                    )}
                  >
                    ₹{item.profit.toLocaleString("en-IN")}
                  </span>
                </p>
                <p className="pt-1">
                  <span className="text-muted-foreground">Profit %:</span>{" "}
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
              <div className="flex flex-col items-center ml-4">
                <div
                  className={cn(
                    "w-16 h-16 rounded-full border-4 flex items-center justify-center text-xs font-semibold mb-2",
                    item.ring
                  )}
                >
                  {item.progress.toFixed(2)}%
                </div>
                <p className="text-xs text-muted-foreground">of Total</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
