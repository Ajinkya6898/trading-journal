import { Chip, Typography, Link as MuiLink } from "@mui/material";
import ReusableTable from "../../ui-components/ReusableTable";
import { useNavigate } from "react-router-dom";
import useStockStore from "../../store/useStockStore";
import { useEffect } from "react";
import Loader from "../../ui-components/Loader";
import TradingSummaryCard from "./TradingSummaryCard";
import SimpleCard from "./SimpleCard";
import TradingPerformanceDashboard from "./TradingPerformanceDashboard";

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
  const navigate = useNavigate();
  const { trades, fetchTrades, loading, summary } = useStockStore();

  useEffect(() => {
    fetchTrades();
  }, []);

  console.log("summary", summary);

  if (loading) return <Loader />;

  const columns = [
    {
      id: "entryDate",
      label: "Entry Date",
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
    {
      id: "exitDate",
      label: "Exit Date",
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
    { id: "daysHeld", label: "Days Held" },
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
          sx={{ fontWeight: 600, cursor: "pointer" }}
        >
          {value}
        </MuiLink>
      ),
    },
    { id: "qty", label: "Qty" },
    { id: "entryPrice", label: "Entry" },
    { id: "exitPrice", label: "Exit" },
    {
      id: "pnl",
      label: "PnL",
      render: (value: number) => (
        <Typography
          sx={{
            fontWeight: 600,
            color: value >= 0 ? "success.main" : "error.main",
            backgroundColor: value >= 0 ? "success.lighter" : "error.lighter",
            borderRadius: "4px",
            display: "inline-block",
            width: 80,
          }}
        >
          ₹ {value.toLocaleString()}
        </Typography>
      ),
    },
    { id: "commission", label: "Comm" },
    {
      id: "realisedPnl",
      label: "Realised PnL",
      render: (value: number) => (
        <Typography
          sx={{
            fontWeight: 600,
            color: value >= 0 ? "success.main" : "error.main",
            backgroundColor: value >= 0 ? "success.lightest" : "error.lightest",
            px: 1,
            py: 0.5,
            borderRadius: "4px",
            display: "inline-block",
            width: 100,
            textAlign: "left",
            p: 0,
          }}
        >
          ₹ {value.toLocaleString()}
        </Typography>
      ),
    },
    {
      id: "win",
      label: "Label",
      render: (value: boolean) => (
        <Chip
          label={value ? "WIN" : "LOSS"}
          color={value ? "success" : "error"}
          variant="outlined"
          size="small"
        />
      ),
    },
    {
      id: "winPercent",
      label: "%Win",
      render: (value: number) => `${value}%`,
    },
    {
      id: "pnlPercent",
      label: "%PnL",
      render: (value: number) => (
        <Typography
          sx={{
            color: value >= 0 ? "success.dark" : "error.dark",
            fontWeight: 500,
          }}
        >
          {value}%
        </Typography>
      ),
    },
    {
      id: "rsAtWork",
      label: "Rs At Work",
      render: (value: number) => `₹ ${value.toLocaleString()}`,
    },
  ];

  return (
    <>
      <TradingPerformanceDashboard data={summary} />
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
