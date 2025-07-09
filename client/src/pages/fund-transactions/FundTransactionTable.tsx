import { useState, useEffect } from "react";
import ReusableTable from "../../ui-components/ReusableTable";
import { format } from "date-fns";
import { Chip, Typography } from "@mui/material";
import { useFundTransactionStore } from "../../store/useFundTransactionStore";
import { FundTransaction } from "../../store/useFundTransactionStore";

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

  const columns: Column<FundTransaction>[] = [
    {
      id: "date",
      label: "Date",
      render: (value: Date | string) => format(new Date(value), "dd MMM yyyy"),
    },
    {
      id: "amount",
      label: "Amount",
      render: (value: number) => (
        <Typography fontWeight={600} color="primary">
          ₹{value.toLocaleString("en-IN")}
        </Typography>
      ),
    },
    {
      id: "account",
      label: "Account",
      render: (value: string) => (
        <Typography fontWeight={500} color="textSecondary">
          {value}
        </Typography>
      ),
    },
    {
      id: "type",
      label: "Type",
      render: (value: "Add" | "Withdraw") => (
        <Chip
          label={value}
          size="small"
          sx={{
            backgroundColor:
              value === "Withdraw" ? "error.main" : "success.main",
            color: "#fff",
            fontWeight: 600,
            p: 1,
          }}
        />
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
