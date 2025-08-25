import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  Grid,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

const tradingData = {
  topPerformingSymbols: [
    {
      symbol: "Reliance",
      trades: 1,
      wins: 1,
      losses: 0,
      totalPnl: 10717.4,
      totalVolume: 49384.5,
      winRate: 100,
      avgPnl: 10717.4,
    },
    {
      symbol: "CUB",
      trades: 1,
      wins: 1,
      losses: 0,
      totalPnl: 6939.45,
      totalVolume: 49927.5,
      winRate: 100,
      avgPnl: 6939.45,
    },
    {
      symbol: "JSW Steel",
      trades: 1,
      wins: 1,
      losses: 0,
      totalPnl: 3937.5,
      totalVolume: 74062.5,
      winRate: 100,
      avgPnl: 3937.5,
    },
    {
      symbol: "Voltas",
      trades: 1,
      wins: 1,
      losses: 0,
      totalPnl: 3415.62,
      totalVolume: 185183.38,
      winRate: 100,
      avgPnl: 3415.62,
    },
    {
      symbol: "Astral",
      trades: 1,
      wins: 1,
      losses: 0,
      totalPnl: 3132,
      totalVolume: 23868,
      winRate: 100,
      avgPnl: 3132,
    },
  ],
  worstPerformingSymbols: [
    {
      symbol: "Torrent Power",
      trades: 1,
      wins: 0,
      losses: 1,
      totalPnl: -3450,
      totalVolume: 100050,
      winRate: 0,
      avgPnl: -3450,
    },
    {
      symbol: "ADF Foods",
      trades: 1,
      wins: 0,
      losses: 1,
      totalPnl: -2679.54,
      totalVolume: 49842,
      winRate: 0,
      avgPnl: -2679.54,
    },
    {
      symbol: "Shoppers Stop",
      trades: 1,
      wins: 0,
      losses: 1,
      totalPnl: -2006,
      totalVolume: 60180,
      winRate: 0,
      avgPnl: -2006,
    },
    {
      symbol: "Sunteck Realty",
      trades: 1,
      wins: 0,
      losses: 1,
      totalPnl: -1838.25,
      totalVolume: 75026.25,
      winRate: 0,
      avgPnl: -1838.25,
    },
    {
      symbol: "MRPL",
      trades: 1,
      wins: 0,
      losses: 1,
      totalPnl: -1485,
      totalVolume: 74925,
      winRate: 0,
      avgPnl: -1485,
    },
  ],
};

const formatCurrency = (amount: any) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount);
};

const formatVolume = (volume: any) => {
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(volume);
};

const PerformanceTable = ({ data, title, isPositive }) => {
  const icon = isPositive ? <TrendingUpIcon /> : <TrendingDownIcon />;

  return (
    <Card elevation={3} sx={{ mb: 4 }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Avatar
            sx={{ bgcolor: isPositive ? "success.main" : "error.main", mr: 2 }}
          >
            {icon}
          </Avatar>
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
        </Box>

        <TableContainer component={Paper} elevation={1}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f8f9fa" }}>
                <TableCell sx={{ fontWeight: 600, fontSize: "0.95rem" }}>
                  Symbol
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: 600, fontSize: "0.95rem" }}
                >
                  Trades
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: 600, fontSize: "0.95rem" }}
                >
                  W/L
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontWeight: 600, fontSize: "0.95rem" }}
                >
                  Total P&L
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontWeight: 600, fontSize: "0.95rem" }}
                >
                  Volume
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: 600, fontSize: "0.95rem" }}
                >
                  Win Rate
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontWeight: 600, fontSize: "0.95rem" }}
                >
                  Avg P&L
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row: any) => (
                <TableRow
                  key={row.symbol}
                  sx={{
                    "&:nth-of-type(odd)": { backgroundColor: "#fafafa" },
                    "&:hover": { backgroundColor: "#f0f0f0" },
                    transition: "background-color 0.2s ease",
                  }}
                >
                  <TableCell>
                    <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                      {row.symbol}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2">{row.trades}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {row.wins}/{row.losses}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color:
                          row.totalPnl >= 0 ? "success.main" : "error.main",
                        fontWeight: 600,
                      }}
                    >
                      {formatCurrency(row.totalPnl)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {formatVolume(row.totalVolume)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={`${row.winRate}%`}
                      color={row.winRate >= 50 ? "success" : "error"}
                      variant="outlined"
                      size="small"
                      sx={{ fontWeight: 500 }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body2"
                      sx={{
                        color: row.avgPnl >= 0 ? "success.main" : "error.main",
                        fontWeight: 500,
                      }}
                    >
                      {formatCurrency(row.avgPnl)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default function TradingPerformanceDashboard() {
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "background.default",
          padding: 3,
        }}
      >
        <Box sx={{ maxWidth: 1200, margin: "0 auto" }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              mb: 4,
              textAlign: "center",
              background: "linear-gradient(45deg, #1976d2, #42a5f5)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Trading Performance Dashboard
          </Typography>

          <Grid container spacing={3}>
            <Grid>
              <PerformanceTable
                data={tradingData.topPerformingSymbols}
                title="Top Performing Symbols"
                isPositive={true}
              />
            </Grid>

            <Grid>
              <PerformanceTable
                data={tradingData.worstPerformingSymbols}
                title="Worst Performing Symbols"
                isPositive={false}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
