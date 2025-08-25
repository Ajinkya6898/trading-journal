import React, { useMemo } from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import useDashboardStore from "../../store/useDashboardStore";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

type Props = {
  monthlyTrades: any;
};

const TradesAndInvestments = ({ monthlyTrades }: Props) => {
  const { doughnutData } = useDashboardStore();

  const { monthLabels, tradeCounts } = useMemo(() => {
    const labels: string[] = [];
    const counts: number[] = [];

    monthlyTrades.forEach((item: any) => {
      const [year, month] = item.month.split("-");
      const date = new Date(Number(year), Number(month) - 1);
      const shortLabel = date.toLocaleString("default", { month: "short" });
      labels.push(shortLabel);
      counts.push(item.tradeCount);
    });

    return { monthLabels: labels, tradeCounts: counts };
  }, [monthlyTrades]);

  const percentile75 = tradeCounts?.map((val) => Math.round(val * 1.1));

  const barChartData = {
    labels: monthLabels,
    datasets: [
      {
        label: "Trades",
        data: tradeCounts,
        backgroundColor: "#90CAF9",
        borderRadius: 4,
        barThickness: 16,
      },
      {
        label: "75th Percentile",
        type: "line",
        data: percentile75,
        borderColor: "#42A5F5",
        backgroundColor: "#42A5F5",
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const chartData = {
    labels: ["Stock Market", "Mutual Fund", "Crypto", "ETF"],
    datasets: [
      {
        label: "Investment",
        data: doughnutData.length > 0 ? doughnutData : [0, 0, 0, 0],
        backgroundColor: ["#42A5F5", "#FFB74D", "#4DB6AC", "#81C784"],
        borderWidth: 2,
      },
    ],
  };

  return (
    <Box>
      <>
        <Card variant="outlined" sx={{ height: "100%" }}>
          <CardContent>
            <Typography variant="h6" color="textSecondary">
              Monthly Trades
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Number of trades per month
            </Typography>
            <Bar
              data={barChartData}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } },
              }}
            />
            <Box display="flex" mt={2} alignItems="center" gap={2}>
              <Box display="flex" alignItems="center" gap={1}>
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    backgroundColor: "#90CAF9",
                    borderRadius: 1,
                  }}
                />
                <Typography variant="caption">Trades</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    backgroundColor: "#42A5F5",
                    borderRadius: 1,
                  }}
                />
                <Typography variant="caption">75th Percentile</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </>
      <Box>
        <Card variant="outlined" sx={{ height: "100%" }}>
          <CardContent>
            <Typography variant="h6" color="textSecondary">
              Investment Split
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Ratio of investments across assets
            </Typography>
            <Box
              height={220}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Doughnut
                data={chartData}
                options={{
                  cutout: "70%",
                  plugins: {
                    legend: { display: false },
                    tooltip: { enabled: true },
                  },
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  fontWeight: 600,
                  fontSize: "1.25rem",
                }}
              >
                100%
              </Box>
            </Box>
            <Box
              display="flex"
              width="100%"
              justifyContent="space-around"
              mt={2}
            >
              {doughnutData?.labels?.map((label: any, idx: any) => (
                <Box
                  key={label}
                  display="flex"
                  flexDirection="column"
                  alignItems="start"
                  gap={0.5}
                >
                  <Typography variant="caption">{label}</Typography>
                  <Box
                    sx={{
                      width: 130,
                      height: 7,
                      borderRadius: 0,
                      backgroundColor:
                        doughnutData?.datasets[0].backgroundColor[idx],
                    }}
                  />
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default TradesAndInvestments;
