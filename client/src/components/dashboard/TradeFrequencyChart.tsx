import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { period: "Jan", trades: 18 },
  { period: "Feb", trades: 22 },
  { period: "Mar", trades: 19 },
  { period: "Apr", trades: 21 },
  { period: "May", trades: 20 },
  { period: "Jun", trades: 20 },
];

export default function TradeFrequencyChart() {
  return (
    <div className="w-full h-full rounded-2xl shadow p-4 flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Trade Frequency (Monthly)</h2>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip formatter={(value: number) => `${value} trades`} />
            <Bar
              dataKey="trades"
              fill="#4f46e5"
              barSize={10}
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
