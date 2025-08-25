import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { Bar, Doughnut } from "react-chartjs-2";

export const monthlyReturnsData = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Monthly P&L (₹)",
      data: [
        1200, -800, 1500, 2200, -400, 1800, 2100, -300, 900, 1300, -1000, 2400,
      ],
      backgroundColor: "#42A5F5",
      borderRadius: 4,
    },
  ],
};

export const winLossData = {
  labels: ["Winning Trades", "Losing Trades"],
  datasets: [
    {
      data: [72, 28],
      backgroundColor: ["#66BB6A", "#EF5350"],
      hoverOffset: 8,
    },
  ],
};

export const profitDistributionData = {
  labels: [
    "< -1000",
    "-1000 to -500",
    "-500 to 0",
    "0 to 500",
    "500 to 1000",
    "> 1000",
  ],
  datasets: [
    {
      label: "Number of Trades",
      data: [2, 5, 8, 12, 10, 7],
      backgroundColor: "#AB47BC",
      borderRadius: 4,
    },
  ],
};

export const assetClassData = {
  labels: ["Stocks", "Mutual Funds", "Crypto", "ETFs"],
  datasets: [
    {
      label: "Profit (₹)",
      data: [15000, 8000, -1200, 4200],
      backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726", "#AB47BC"],
    },
  ],
};

const ChartCard = ({
  title,
  subtitle,
  children,
}: {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  description?: any;
  chart?: any;
}) => (
  <Card variant="outlined" sx={{ width: "100%", height: "100%" }}>
    <CardContent>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        {subtitle}
      </Typography>
      {children}
    </CardContent>
  </Card>
);

const PerformanceOverview = () => {
  return (
    <Box display="flex" flexWrap="wrap" justifyContent="space-between">
      <ChartCard
        title="Monthly Returns"
        description="Profits/Losses each month"
        chart={
          <Bar
            data={monthlyReturnsData}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
            }}
          />
        }
      />
      <ChartCard
        title="Win vs Loss Ratio"
        description="Winning vs losing trades"
        chart={
          <Doughnut
            data={winLossData}
            options={{ plugins: { legend: { display: false } } }}
          />
        }
      />
      <ChartCard
        title="Profit Distribution"
        description="Distribution of trade outcomes"
        chart={
          <Bar
            data={profitDistributionData}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
            }}
          />
        }
      />
      <ChartCard
        title="Asset Class Performance"
        description="Profit/Loss per asset class"
        chart={
          <Bar
            data={assetClassData}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
            }}
          />
        }
      />
    </Box>
  );
};

export default PerformanceOverview;
