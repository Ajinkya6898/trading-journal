import React from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
} from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Types
interface MonthlyTradeStats {
  month: string;
  tradeCount: number;
  monthlyPnl: number;
  wins: number;
  losses: number;
  winRate: number;
}

interface MonthlyTradeStatsChartProps {
  monthlyTradeStats: MonthlyTradeStats[];
}

const MonthlyTradeStatsChart: React.FC<MonthlyTradeStatsChartProps> = ({
  monthlyTradeStats,
}) => {
  const theme = useTheme();

  // Format month labels for better display
  const formatMonth = (month: string): string => {
    const date = new Date(month + "-01");
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  // Filter out months with no trades for cleaner visualization
  const activeMonths = monthlyTradeStats?.filter((stat) => stat.tradeCount > 0);

  // Prepare data for P&L chart
  const pnlData = {
    labels: activeMonths?.map((stat) => formatMonth(stat.month)),
    datasets: [
      {
        label: "Monthly P&L (₹)",
        data: activeMonths?.map((stat) => stat.monthlyPnl),
        borderColor: theme.palette.primary.main,
        backgroundColor: activeMonths?.map((stat) =>
          stat.monthlyPnl >= 0
            ? "rgba(76, 175, 80, 0.1)"
            : "rgba(244, 67, 54, 0.1)"
        ),
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: activeMonths?.map((stat) =>
          stat.monthlyPnl >= 0 ? "#4CAF50" : "#F44336"
        ),
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  // Prepare data for trade count chart
  const tradeCountData = {
    labels: activeMonths?.map((stat) => formatMonth(stat.month)),
    datasets: [
      {
        label: "Wins",
        data: activeMonths?.map((stat) => stat.wins),
        backgroundColor: "rgba(76, 175, 80, 0.8)",
        borderColor: "#4CAF50",
        borderWidth: 1,
      },
      {
        label: "Losses",
        data: activeMonths?.map((stat) => stat.losses),
        backgroundColor: "rgba(244, 67, 54, 0.8)",
        borderColor: "#F44336",
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for win rate chart
  const winRateData = {
    labels: activeMonths?.map((stat) => formatMonth(stat.month)),
    datasets: [
      {
        label: "Win Rate (%)",
        data: activeMonths?.map((stat) => stat.winRate),
        borderColor: theme.palette.secondary.main,
        backgroundColor: "rgba(156, 39, 176, 0.1)",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: theme.palette.secondary.main,
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  // Chart options
  const pnlChartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: {
            size: 12,
            weight: "bold",
          },
        },
      },
      title: {
        display: true,
        text: "Monthly P&L Trend",
        font: {
          size: 16,
          weight: "bold",
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw as number;
            return `P&L: ₹${value?.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return "₹" + (value as number)?.toLocaleString("en-IN");
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
      x: {
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
    },
  };

  const tradeCountChartOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: {
            size: 12,
            weight: "bold",
          },
        },
      },
      title: {
        display: true,
        text: "Wins vs Losses by Month",
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
      x: {
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
    },
  };

  const winRateChartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: {
            size: 12,
            weight: "bold",
          },
        },
      },
      title: {
        display: true,
        text: "Win Rate Trend",
        font: {
          size: 16,
          weight: "bold",
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw as number;
            return `Win Rate: ${value.toFixed(2)}%`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function (value) {
            return value + "%";
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
      x: {
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
    },
  };

  // Calculate summary stats
  const totalTrades = activeMonths?.reduce(
    (sum, stat) => sum + stat.tradeCount,
    0
  );
  const totalPnl = activeMonths?.reduce(
    (sum, stat) => sum + stat.monthlyPnl,
    0
  );
  const totalWins = activeMonths?.reduce((sum, stat) => sum + stat.wins, 0);
  const overallWinRate = totalTrades > 0 ? (totalWins / totalTrades) * 100 : 0;

  return (
    <Box sx={{ p: 3, backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          mb: 4,
          textAlign: "center",
          fontWeight: 600,
          color: theme.palette.primary.main,
        }}
      >
        Monthly Trading Performance Analytics
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid>
          <Card elevation={3}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography
                variant="h4"
                sx={{ color: theme.palette.primary.main, fontWeight: 600 }}
              >
                {totalTrades}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Trades
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid>
          <Card elevation={3}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography
                variant="h4"
                sx={{
                  color:
                    totalPnl >= 0
                      ? theme.palette.success.main
                      : theme.palette.error.main,
                  fontWeight: 600,
                }}
              >
                ₹
                {totalPnl?.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total P&L
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid>
          <Card elevation={3}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography
                variant="h4"
                sx={{ color: theme.palette.success.main, fontWeight: 600 }}
              >
                {totalWins}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Wins
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid>
          <Card elevation={3}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography
                variant="h4"
                sx={{ color: theme.palette.secondary.main, fontWeight: 600 }}
              >
                {overallWinRate.toFixed(1)}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Overall Win Rate
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid>
          <Paper elevation={3} sx={{ p: 3, height: 400 }}>
            <Line data={pnlData} options={pnlChartOptions} />
          </Paper>
        </Grid>
        <Grid>
          <Paper elevation={3} sx={{ p: 3, height: 400 }}>
            <Bar data={tradeCountData} options={tradeCountChartOptions} />
          </Paper>
        </Grid>
        <Grid>
          <Paper elevation={3} sx={{ p: 3, height: 400 }}>
            <Line data={winRateData} options={winRateChartOptions} />
          </Paper>
        </Grid>
      </Grid>

      {/* No Data Message */}
      {activeMonths?.length === 0 && (
        <Paper elevation={3} sx={{ p: 4, textAlign: "center", mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No trading activity found in the provided data.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Start trading to see your performance analytics here.
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default MonthlyTradeStatsChart;
