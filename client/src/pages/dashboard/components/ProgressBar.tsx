import { Card, CardContent } from "@/components/ui/card";

interface ProgressBarProps {
  label: string;
  value: number; // current value (0-100)
  target?: number; // optional target value for comparison
  color?: string;
}

function VerticalProgressBar({
  label,
  value,
  target = 100,
  color = "bg-blue-500",
}: ProgressBarProps) {
  const percentage = Math.min((value / target) * 100, 100);
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-6 h-40 bg-gray-200 rounded-md overflow-hidden">
        <div
          className={`${color} absolute bottom-0 w-full rounded-b-md`}
          style={{ height: `${percentage}%` }}
        />
      </div>
      <div className="mt-2 text-center text-xs font-medium text-gray-700 w-24">
        <div className="truncate">{label}</div>
        <div className="text-gray-900">{value.toFixed(1)}%</div>
      </div>
    </div>
  );
}

export default function ProgressBars({
  winningPercent,
  capitalGrowthPercent,
  maxDrawdownPercent,
}: {
  winningPercent: number;
  capitalGrowthPercent: number;
  maxDrawdownPercent: number;
}) {
  return (
    <Card className="rounded-2xl shadow-md bg-white p-6 max-w-4xl mx-auto mb-10">
      <CardContent className="p-0">
        <div className="flex justify-center gap-8">
          <VerticalProgressBar
            label="Win % (70%)"
            value={winningPercent}
            target={70}
            color="bg-green-500"
          />
          <VerticalProgressBar
            label="Capital Growth"
            value={capitalGrowthPercent}
            color="bg-indigo-500"
          />
          <VerticalProgressBar
            label="Drawdown (20%)"
            value={maxDrawdownPercent}
            target={20}
            color={maxDrawdownPercent > 15 ? "bg-red-500" : "bg-yellow-400"}
          />
        </div>
      </CardContent>
    </Card>
  );
}
