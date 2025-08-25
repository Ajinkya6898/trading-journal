import { useState, useEffect } from "react";
import ReusableTable from "../../ui-components/ReusableTable";
import { format } from "date-fns";
import { Box, Chip, IconButton, Tooltip, Typography } from "@mui/material";
import { useFundTransactionStore } from "../../store/useFundTransactionStore";
import { FundTransaction } from "../../store/useFundTransactionStore";
import { MoreVert } from "@mui/icons-material";

const FundTransactionTable = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const { transactions, fetchTransactions, loading } =
    useFundTransactionStore();

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleSelectRow = (id: string | number | Date) => {
    const strId = String(id);
    setSelectedRows((prev) =>
      prev.includes(strId)
        ? prev.filter((item) => item !== strId)
        : [...prev, strId]
    );
  };

  const columns = [
    {
      id: "srNo",
      label: "Sr. No.",
      render: (index: any) => (
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            color: "#77878F",
            textAlign: "center",
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#F7FAFF",
            borderRadius: "50%",
            fontSize: "0.875rem",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </Typography>
      ),
    },
    {
      id: "date",
      label: "Date",
      render: (value: any) => (
        <Box>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: "#1B2122",
              fontSize: "0.875rem",
            }}
          >
            {format(new Date(value), "dd MMM yyyy")}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "#77878F",
              fontSize: "0.75rem",
            }}
          >
            {format(new Date(value), "EEEE")}
          </Typography>
        </Box>
      ),
    },
    {
      id: "amount",
      label: "Amount",
      render: (value: any, row: any) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 1,
          }}
        >
          <Box sx={{ textAlign: "right" }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
                color: row.type === "Add" ? "#008447" : "#CF192A",
                fontSize: "0.95rem",
              }}
            >
              {row.type === "Add" ? "+" : "-"}₹{value.toLocaleString("en-IN")}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      id: "account",
      label: "Account",
      render: (value: any) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Box>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: "#1B2122",
                fontSize: "0.875rem",
              }}
            >
              {value}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      id: "type",
      label: "Transaction Type",
      render: (value: any) => (
        <Chip
          label={value}
          size="small"
          sx={{
            backgroundColor: value === "Add" ? "#F2F8F7" : "#F7EFF0",
            color: value === "Add" ? "#008447" : "#CF192A",
            fontWeight: 600,
            fontSize: "0.75rem",
            height: 28,
            minWidth: 80,
            borderRadius: "14px",
            border: `1px solid ${value === "Add" ? "#008447" : "#CF192A"}`,
            "&:hover": {
              backgroundColor: value === "Add" ? "#E8F5F0" : "#F0E5E6",
            },
          }}
        />
      ),
    },

    {
      id: "status",
      label: "Status",
      render: (value: any) => {
        const getStatusProps = (status: any) => {
          switch (status?.toLowerCase()) {
            case "completed":
            case "success":
              return {
                color: "#008447",
                bg: "#F2F8F7",
                label: "Completed",
                border: "#22c55e",
              };
            case "pending":
              return {
                color: "#F57C00",
                bg: "#FFF8E1",
                label: "Pending",
                border: "#FF9800",
              };
            case "failed":
            case "cancelled":
              return {
                color: "#CF192A",
                bg: "#F7EFF0",
                label: "Failed",
                border: "#ef4444",
              };
            default:
              return {
                color: "#77878F",
                bg: "#F5F5F5",
                label: value || "Unknown",
                border: "#C3D3DB",
              };
          }
        };

        const statusProps = getStatusProps(value);

        return (
          <Chip
            label={statusProps.label}
            size="small"
            sx={{
              backgroundColor: statusProps.bg,
              color: statusProps.color,
              fontWeight: 600,
              fontSize: "0.75rem",
              height: 28,
              minWidth: 90,
              borderRadius: "14px",
              border: `1px solid ${statusProps.border}`,
              textTransform: "capitalize",
            }}
          />
        );
      },
    },
    {
      id: "actions",
      label: "Actions",
      render: () => (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Tooltip title="More options" arrow>
            <IconButton
              size="small"
              sx={{
                color: "#77878F",
                backgroundColor: "#F7FAFF",
                border: "1px solid #EBF2F5",
                borderRadius: "8px",
                width: 32,
                height: 32,
                "&:hover": {
                  backgroundColor: "#F0F3F6",
                  borderColor: "#C3D3DB",
                  color: "#3385F0",
                },
              }}
            >
              <MoreVert sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <ReusableTable<FundTransaction>
      data={transactions}
      columns={columns}
      rowKey="_id"
      selectedRows={selectedRows}
      onSelectRow={handleSelectRow}
      tableHeader="Fund Transactions"
      loading={loading}
    />
  );
};

export default FundTransactionTable;
