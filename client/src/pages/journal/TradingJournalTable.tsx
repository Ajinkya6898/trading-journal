import { Chip, Typography, Link as MuiLink, Box } from "@mui/material";
import ReusableTable from "../../ui-components/ReusableTable";
import { useNavigate } from "react-router-dom";
import useStockStore from "../../store/useStockStore";
import { useEffect, useState } from "react";
import Loader from "../../ui-components/Loader";
import TradingPerformanceDashboard from "./TradingPerformanceDashboard";
import TradeJournalFilters from "./TradeJournalFilters";

type Trade = {
  id: string;
  entryDate: string;
  exitDate: string;
  daysHeld: number;
  stockName: string;
  qty: number;
  entryPrice: number;
  exitPrice: number;
  pnl: number;
  commission: number;
  realisedPnl: number;
  win: boolean;
  winPercent: number;
  pnlPercent: number;
  rsAtWork: number;
};

const TradingJournalTable = () => {
  const [winLossType, setWinLossType] = useState<
    "All" | "Only Winners" | "Only Losers"
  >("All");
  const [tradeType, setTradeType] = useState<
    "Intraday" | "Swing" | "Positional" | "Investment"
  >("Intraday");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const navigate = useNavigate();
  const { trades, fetchTrades, loading, summary } = useStockStore();

  useEffect(() => {
    fetchTrades();
  }, []);

  console.log("summary", summary);

  if (loading) return <Loader />;

  const columns = [
    {
      id: "srNo",
      label: "#",
      render: (value: any, row: Trade, index: number) => (
        <Typography variant="body2">{index + 1}</Typography>
      ),
    },
    {
      id: "entryDate",
      label: "Entry Date",
      render: (value: string) => (
        <Typography variant="subtitle2" color="text.primary">
          {new Date(value).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </Typography>
      ),
    },
    {
      id: "exitDate",
      label: "Exit Date",
      render: (value: string) => (
        <Typography variant="subtitle2" color="text.primary">
          {new Date(value).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </Typography>
      ),
    },
    {
      id: "daysHeld",
      label: "Days",
      render: (value: number) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          {/* <AccessTimeIcon sx={{ fontSize: 16, color: "text.secondary" }} /> */}
          <Typography variant="subtitle2" color="text.primary">
            {value}
          </Typography>
        </Box>
      ),
    },
    {
      id: "stockName",
      label: "Stock Name",
      render: (value: string, row: Trade) => (
        <MuiLink
          underline="hover"
          color="primary"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/trades/${row.id}`);
          }}
          sx={{
            fontWeight: 500,
            cursor: "pointer",
            fontSize: "0.95rem",
            "&:hover": {
              backgroundColor: "primary.lighter",
              py: 0.25,
              borderRadius: 1,
              transition: "all 0.2s ease-in-out",
            },
          }}
        >
          {value}
        </MuiLink>
      ),
    },
    {
      id: "qty",
      label: "QTY",
      render: (value: number) => (
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 600, color: "text.primary" }}
        >
          {value.toLocaleString()}
        </Typography>
      ),
    },
    {
      id: "entryPrice",
      label: "Entry",
      render: (value: number) => (
        <Box sx={{ textAlign: "right" }}>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 600, color: "text.primary" }}
          >
            {value.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Typography>
        </Box>
      ),
    },

    {
      id: "exitPrice",
      label: "Exit",
      render: (value: number) => (
        <Box sx={{ textAlign: "right" }}>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 600, color: "text.primary" }}
          >
            {value.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Typography>
        </Box>
      ),
    },
    {
      id: "pnl",
      label: "P&L",
      render: (value: number) => (
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.5,
            py: 0.5,
            borderRadius: 2,
            minWidth: 80,
            justifyContent: "center",
          }}
        >
          <Typography variant="subtitle2" color="text.primary">
            {Math.abs(value).toLocaleString()}
          </Typography>
        </Box>
      ),
    },
    {
      id: "commission",
      label: "Charges",
      render: (value: number) => (
        <Typography color="text.primary" variant="subtitle2">
          {value.toLocaleString()}
        </Typography>
      ),
    },
    {
      id: "realisedPnl",
      label: "Realised P&L",
      render: (value: number) => (
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 700,
            color: value >= 0 ? "success.medium" : "error.medium",
            fontSize: "0.9rem",
          }}
        >
          ₹ {Math.abs(value).toLocaleString()}
        </Typography>
      ),
    },

    {
      id: "pnlPercent",
      label: "% P&L",
      render: (value: number) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Typography variant="subtitle2" color="text.primary">
            {Math.abs(value).toFixed(2)}%
          </Typography>
        </Box>
      ),
    },
    {
      id: "timeFrame",
      label: "TF",
      render: (value: string) => (
        <Chip
          label={value}
          color="primary"
          variant="outlined"
          size="small"
          sx={{
            fontWeight: 600,
            fontSize: "0.75rem",
            height: 24,
            px: 1,
            py: 2,
            "& .MuiChip-label": {
              px: 0.5,
            },
          }}
        />
      ),
    },
    {
      id: "rsAtWork",
      label: "Rs At Work",
      render: (value: number) => (
        <Box sx={{ textAlign: "right" }}>
          <Typography variant="subtitle2" color="text.primary">
            ₹ {value.toLocaleString()}
          </Typography>
        </Box>
      ),
    },
  ];

  return (
    <>
      <TradingPerformanceDashboard data={summary} />
      <TradeJournalFilters
        winLossType={winLossType}
        onWinLossTypeChange={setWinLossType}
        tradeType={tradeType}
        onTradeTypeChange={setTradeType}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />

      <ReusableTable<Trade>
        columns={columns}
        data={trades}
        rowKey="id"
        tableHeader="My Trading Journal"
        showCheckbox={false}
      />
    </>
  );
};

export default TradingJournalTable;
