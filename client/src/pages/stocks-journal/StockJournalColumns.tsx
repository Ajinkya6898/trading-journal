import React from "react";
import { Typography, Box, Chip, Link as MuiLink, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Trade } from "../../store/useStockStore";

interface Column {
  id: string;
  label: string;
  render: (value: any, row: Trade, index: number) => React.ReactNode;
}

export const stockJournalColumns: Column[] = [
  {
    id: "srNo",
    label: "#",
    render: (_, __, index) => (
      <Typography variant="body2">{index + 1}</Typography>
    ),
  },
  {
    id: "entryDate",
    label: "Entry Date",
    render: (value) => (
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
    render: (value) => (
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
    render: (value) => (
      <Typography variant="subtitle2" color="text.primary">
        {value}
      </Typography>
    ),
  },
  {
    id: "stockName",
    label: "Stock Name",
    render: (value, row) => {
      const navigate = useNavigate();
      return (
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
      );
    },
  },
  {
    id: "qty",
    label: "QTY",
    render: (value) => (
      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
        {value.toLocaleString()}
      </Typography>
    ),
  },
  {
    id: "entryPrice",
    label: "Entry",
    render: (value) => (
      <Box sx={{ textAlign: "right" }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
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
    render: (value) => (
      <Box sx={{ textAlign: "right" }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
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
    render: (value) => (
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          py: 0.5,
          borderRadius: 2,
          minWidth: 80,
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
    render: (value) => (
      <Typography color="text.primary" variant="subtitle2">
        {value.toLocaleString()}
      </Typography>
    ),
  },
  {
    id: "realisedPnl",
    label: "Realised P&L",
    render: (value) => (
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
    render: (value) => (
      <Typography variant="subtitle2" color="text.primary">
        {Math.abs(value).toFixed(2)}%
      </Typography>
    ),
  },
  {
    id: "timeFrame",
    label: "TF",
    render: (value) => (
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
          "& .MuiChip-label": { px: 0.5 },
        }}
      />
    ),
  },
  {
    id: "rsAtWork",
    label: "Rs At Work",
    render: (value) => (
      <Box sx={{ textAlign: "right" }}>
        <Typography variant="subtitle2" color="text.primary">
          ₹ {value.toLocaleString()}
        </Typography>
      </Box>
    ),
  },
  {
    id: "aiInsights",
    label: "AI Insights",
    render: (_, row) => {
      const navigate = useNavigate();
      return (
        <Button
          variant="outlined"
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/ai-enhance/${row.id}`);
          }}
        >
          Enhance
        </Button>
      );
    },
  },
];
