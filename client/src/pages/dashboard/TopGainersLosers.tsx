import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Avatar,
  Divider,
  Stack,
  CircularProgress,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

type Stock = {
  symbol: string;
  lastPrice: string;
  pChange: string;
  industry: string;
};

const TopGainersLosers: React.FC = () => {
  const [gainers, setGainers] = useState<Stock[]>([]);
  const [losers, setLosers] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchFromNSE = async (type: "gainers" | "losers") => {
    const proxy = "https://thingproxy.freeboard.io/fetch/";
    const url = `https://www.nseindia.com/api/live-analysis-variations?index=${type}`;

    try {
      const res = await fetch(proxy + url);
      const data = await res.json();
      return data.data.slice(0, 5);
    } catch (err) {
      throw new Error("Unable to fetch NSE data.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const [gainersData, losersData] = await Promise.all([
          fetchFromNSE("gainers"),
          fetchFromNSE("losers"),
        ]);
        setGainers(gainersData);
        setLosers(losersData);
      } catch (err: any) {
        setError(err.message || "Error occurred while fetching data.");
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const renderStockCard = (stock: Stock, isGainer: boolean, index: number) => {
    return (
      <Card
        key={stock.symbol}
        elevation={3}
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
          mb: 1,
          bgcolor: isGainer ? "#e8f5e9" : "#ffebee",
        }}
      >
        <Avatar
          sx={{
            bgcolor: isGainer ? "success.main" : "error.main",
            mr: 2,
          }}
        >
          {isGainer ? <TrendingUpIcon /> : <TrendingDownIcon />}
        </Avatar>
        <Box>
          <Typography variant="subtitle1" fontWeight={600}>
            {index + 1}. {stock.symbol}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ₹{stock.lastPrice} ({stock.pChange}%)
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {stock.industry}
          </Typography>
        </Box>
      </Card>
    );
  };

  if (loading)
    return (
      <Box textAlign="center" py={4}>
        <CircularProgress />
        <Typography variant="body2" mt={1}>
          Fetching today's movers...
        </Typography>
      </Box>
    );

  if (error)
    return (
      <Box textAlign="center" py={4} color="error.main">
        <ErrorOutlineIcon fontSize="large" />
        <Typography variant="body1">{error}</Typography>
      </Box>
    );

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Stack direction="row" alignItems="center" mb={2} gap={1}>
              <ShowChartIcon color="success" />
              <Typography variant="h6" fontWeight="bold">
                Top 5 Gainers Today
              </Typography>
            </Stack>
            {gainers.map((stock, idx) => renderStockCard(stock, true, idx))}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Stack direction="row" alignItems="center" mb={2} gap={1}>
              <ShowChartIcon color="error" />
              <Typography variant="h6" fontWeight="bold">
                Top 5 Losers Today
              </Typography>
            </Stack>
            {losers.map((stock, idx) => renderStockCard(stock, false, idx))}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default TopGainersLosers;
