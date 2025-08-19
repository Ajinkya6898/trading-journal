import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Stack,
  Divider,
  useTheme,
  Paper,
  Chip,
} from "@mui/material";
import {
  TrendingUp,
  TrendingDown,
  // Calendar,
  // CalendarDays,
  // CalendarRange,
  Timer,
  ShowChart,
} from "@mui/icons-material";

// TypeScript interfaces
interface PeriodData {
  trades: number;
  wins: number;
  losses: number;
  winRate: number;
  totalPnl: number;
}

interface PeriodStats {
  today: PeriodData;
  thisWeek: PeriodData;
  thisMonth: PeriodData;
  thisYear: PeriodData;
}

interface PeriodStatsDashboardProps {
  periodStats: PeriodStats;
}

interface StatCardProps {
  title: string;
  icon: React.ReactElement;
  data: PeriodData;
  color: "primary" | "secondary" | "info" | "success";
}

const StatCard: React.FC<StatCardProps> = ({ title, icon, data, color }) => {
  const theme = useTheme();
  const isProfit = data.totalPnl >= 0;
  const hasActivity = data.trades > 0;

  const formatCurrency = (value: number): string => {
    const absValue = Math.abs(value);
    if (absValue >= 10000000) return `₹${(absValue / 10000000).toFixed(1)}Cr`;
    if (absValue >= 100000) return `₹${(absValue / 100000).toFixed(1)}L`;
    if (absValue >= 1000) return `₹${(absValue / 1000).toFixed(1)}K`;
    return `₹${absValue.toLocaleString()}`;
  };

  const getWinRateColor = (rate: number): string => {
    if (rate >= 70) return theme.palette.success.main;
    if (rate >= 50) return "#ff9800";
    return theme.palette.error.main;
  };

  const colorMap = {
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    info: theme.palette.info.main,
    success: theme.palette.success.main,
  };

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          borderColor: colorMap[color],
          boxShadow: `0 4px 20px ${colorMap[color]}15`,
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              bgcolor: `${colorMap[color]}10`,
              color: colorMap[color],
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: theme.palette.text.primary }}
            >
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {hasActivity ? `${data.trades} trades` : "No activity"}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        {/* P&L Section */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 1, fontWeight: 500 }}
          >
            Profit & Loss
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            {data.totalPnl !== 0 && (
              <Box
                sx={{
                  color: isProfit
                    ? theme.palette.success.main
                    : theme.palette.error.main,
                }}
              >
                {isProfit ? (
                  <TrendingUp fontSize="small" />
                ) : (
                  <TrendingDown fontSize="small" />
                )}
              </Box>
            )}
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color:
                  data.totalPnl === 0
                    ? theme.palette.text.primary
                    : isProfit
                    ? theme.palette.success.main
                    : theme.palette.error.main,
              }}
            >
              {data.totalPnl === 0
                ? "₹0"
                : (isProfit ? "+" : "-") + formatCurrency(data.totalPnl)}
            </Typography>
          </Stack>
        </Box>

        {/* Trading Stats */}
        {hasActivity ? (
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  bgcolor: `${theme.palette.success.main}08`,
                  borderRadius: 1.5,
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: theme.palette.success.main }}
                >
                  {data.wins}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Wins
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  bgcolor: `${theme.palette.error.main}08`,
                  borderRadius: 1.5,
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: theme.palette.error.main }}
                >
                  {data.losses}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Losses
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ mt: 1 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 1 }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontWeight={500}
                  >
                    Win Rate
                  </Typography>
                  <Chip
                    label={`${data.winRate}%`}
                    size="small"
                    sx={{
                      bgcolor: `${getWinRateColor(data.winRate)}15`,
                      color: getWinRateColor(data.winRate),
                      fontWeight: 600,
                      fontSize: "0.75rem",
                    }}
                  />
                </Stack>
                <Box
                  sx={{
                    width: "100%",
                    height: 6,
                    bgcolor: theme.palette.grey[200],
                    borderRadius: 3,
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      width: `${data.winRate}%`,
                      height: "100%",
                      bgcolor: getWinRateColor(data.winRate),
                      borderRadius: 3,
                      transition: "width 0.3s ease",
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        ) : (
          <Box sx={{ textAlign: "center", py: 2 }}>
            <ShowChart
              sx={{
                fontSize: 48,
                color: theme.palette.grey[300],
                mb: 1,
              }}
            />
            <Typography variant="body2" color="text.secondary">
              No trading activity yet
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

const PeriodStatsDashboard: React.FC<PeriodStatsDashboardProps> = ({
  periodStats,
}) => {
  const theme = useTheme();

  const periodConfigs = [
    {
      key: "today" as keyof PeriodStats,
      title: "Today",
      icon: <Timer />,
      color: "primary" as const,
    },
    {
      key: "thisWeek" as keyof PeriodStats,
      title: "This Week",
      // icon: <CalendarDays />,
      color: "secondary" as const,
    },
    {
      key: "thisMonth" as keyof PeriodStats,
      title: "This Month",
      // icon: <Calendar />,
      color: "info" as const,
    },
    {
      key: "thisYear" as keyof PeriodStats,
      title: "This Year",
      // icon: <CalendarRange />,
      color: "success" as const,
    },
  ];

  // Safeguard: Return loading state if data is not ready
  const isDataReady =
    periodStats &&
    periodConfigs.every(
      (cfg) => cfg.key in periodStats && periodStats[cfg.key] !== undefined
    );

  if (!isDataReady) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6" color="text.secondary">
          Loading performance stats...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: theme.palette.text.primary,
            mb: 0.5,
          }}
        >
          Trading Performance
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track your trading statistics across different time periods
        </Typography>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3}>
        {periodConfigs.map((config) => (
          <Grid item xs={12} sm={6} lg={3} key={config.key}>
            <StatCard
              title={config.title}
              icon={config.icon}
              data={periodStats[config.key]}
              color={config.color}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PeriodStatsDashboard;
