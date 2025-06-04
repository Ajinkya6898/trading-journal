"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Winners", value: 65 },
  { name: "Losers", value: 35 },
];

const COLORS = ["#22c55e", "#ef4444"];

export default function WinnerLoserPieChart() {
  return (
    <Card className="w-full shadow-xl rounded-2xl">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Winners vs Losers
        </CardTitle>
        <p className="text-sm text-muted-foreground">+23% new trades</p>
      </CardHeader>
      <CardContent className="space-y-1 mt-[-30px]">
        <div className="h-36">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={55}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex justify-between text-sm px-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full" />
            Winners ({data[0].value}%)
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-red-500 rounded-full" />
            Losers ({data[1].value}%)
          </div>
        </div>

        <p className="text-sm mt-3 text-muted-foreground text-center">
          Overall Win Rate:{" "}
          <span className="font-medium text-green-500">65%</span> from 40 trades
        </p>
      </CardContent>
    </Card>
  );
}
