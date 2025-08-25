import React, { useEffect } from "react";
import { Typography, Box, Chip } from "@mui/material";
import { CalendarToday } from "@mui/icons-material";
import ReusableTable from "../../ui-components/ReusableTable";
import { useMutualFundStore } from "../../store/useMutualFundStore";
import Loader from "../../ui-components/Loader";

// Define the MutualFund interface (you can add this to your types file)
interface MutualFund {
  id: string;
  fundName: string;
  date: string;
  units: number;
  nav: number;
  amount: number;
  fundType?: string; // e.g., "Equity", "Debt", "Hybrid"
  amc?: string; // Asset Management Company
}

interface Column {
  id: string;
  label: string;
  render: (value: any, row: MutualFund, index: number) => React.ReactNode;
}

// Function to get fund type color
const getFundTypeColor = (fundType: string) => {
  const colors = {
    Equity: "success",
    Debt: "info",
    Hybrid: "warning",
    ELSS: "secondary",
    Index: "primary",
  };
  return colors[fundType as keyof typeof colors] || "default";
};

export const mutualFundColumns: Column[] = [
  {
    id: "srNo",
    label: "SR NO",
    render: (_, __, index) => (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 400,
            color: "text.secondary",
            minWidth: 24,
            textAlign: "center",
          }}
        >
          {index + 1}
        </Typography>
      </Box>
    ),
  },
  {
    id: "fundName",
    label: "Fund Name",
    render: (value, row) => (
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 1.5, minWidth: 200 }}
      >
        <Box>
          <Typography variant="subtitle2" color="text.primary">
            {value}
          </Typography>
          {row.amc && (
            <Typography variant="caption" color="text.primary">
              {row.amc}
            </Typography>
          )}
        </Box>
      </Box>
    ),
  },
  {
    id: "date",
    label: "Date",
    render: (value) => (
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
        <CalendarToday
          sx={{
            fontSize: 18,
            color: "text.secondary",
            mt: 0.25,
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="subtitle2" color="text.primary">
            {new Date(value).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </Typography>
          <Typography variant="caption">
            {new Date(value).toLocaleDateString("en-US", { weekday: "long" })}
          </Typography>
        </Box>
      </Box>
    ),
  },
  {
    id: "units",
    label: "Units",
    render: (value) => (
      <Box sx={{ textAlign: "right" }}>
        <Typography variant="subtitle2" color="primary.main">
          {value.toLocaleString(undefined, {
            minimumFractionDigits: 3,
            maximumFractionDigits: 3,
          })}
        </Typography>
      </Box>
    ),
  },
  {
    id: "nav",
    label: "NAV",
    render: (value) => (
      <Box sx={{ textAlign: "right" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 0.5,
          }}
        >
          <Typography variant="subtitle2" color="text.primary">
            ₹
            {value.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 4,
            })}
          </Typography>
        </Box>
      </Box>
    ),
  },
  {
    id: "amount",
    label: "Amount",
    render: (value) => (
      <Box sx={{ textAlign: "right" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 0.5,
          }}
        >
          <Typography variant="subtitle2" color="text.primary">
            ₹
            {value.toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </Typography>
        </Box>
      </Box>
    ),
  },
  {
    id: "fundType",
    label: "Type",
    render: (value) => (
      <Chip
        label={value || "N/A"}
        color={getFundTypeColor(value || "")}
        variant="outlined"
        size="small"
        sx={{
          fontWeight: 400,
          fontSize: "0.75rem",
          height: 28,
          borderRadius: 2,
          "& .MuiChip-label": {
            px: 1,
            py: 0.5,
          },
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      />
    ),
  },
];

// Sample usage component
export const MutualFundJournal: React.FC = () => {
  const { entries, fetchFunds, loading } = useMutualFundStore();

  useEffect(() => {
    fetchFunds();
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <ReusableTable
        columns={mutualFundColumns}
        data={entries}
        rowKey="id"
        tableHeader="My Mutual Fund Portfolio"
        showCheckbox={false}
        showPagination={true}
        itemsPerPageOptions={[25, 50, 100]}
        paginationId="my-table"
        navigationConstant="NAV_CONSTANT"
        paginationConstant="PAGE_CONSTANT"
      />
    </>
  );
};
