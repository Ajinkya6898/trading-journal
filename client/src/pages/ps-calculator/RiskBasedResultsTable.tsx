import { useEffect } from "react";
import ReusableTable from "../../ui-components/ReusableTable";
import { useRiskPositionStore } from "../../store/useRiskPositionStore";
import { Button, Stack } from "@mui/material";
import { useModal } from "../../ui-components/ModalProvider";
import axiosInstance from "../../store/axiosInstance";

const RiskBasedResultsTable = () => {
  const entries = useRiskPositionStore((state) => state.entries);
  const loadEntries = useRiskPositionStore((state) => state.loadEntries);

  const { modalDispatch } = useModal();

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  const handleDelete = async (id: string) => {
    try {
      const res = await axiosInstance.delete(`/positions-risk/${id}`);

      useRiskPositionStore.setState((state) => ({
        entries: state.entries.filter((entry) => entry._id !== id),
      }));

      await loadEntries();

      modalDispatch({
        type: "success",
        message: res.data.message || "Entry deleted successfully!",
      });
    } catch (error: any) {
      console.error("Delete error:", error);
      modalDispatch({
        type: "error",
        message:
          error.response?.data?.message ||
          "Server error. Please try again later.",
      });
    }
  };

  const columns = [
    {
      id: "id",
      label: "ID",
      render: (_: any, __: any, rowIndex: number) => rowIndex + 1,
    },
    { id: "stockName", label: "Symbol" },
    { id: "totalCapital", label: "Capital" },
    { id: "riskPercent", label: "Risk %" },
    { id: "riskAmount", label: "Risk Amt" },
    { id: "entryPrice", label: "Entry" },
    { id: "stopLossPrice", label: "SL" },
    // You mentioned removing Position Size in Risk PS, so you can skip this if not needed
    { id: "positionSize", label: "Position Size" },
    { id: "positionSize", label: "Qty" },
    { id: "atr", label: "ATR" },
    { id: "atrMultiplier", label: "ATR x" },
    { id: "partialTarget", label: "Partial" },
    { id: "partialPercent", label: "Partial %" },
    { id: "exitReturnPercent", label: "Exit %" },
    { id: "exitPrice", label: "Exit Price" },

    {
      id: "actions",
      label: "Action",
      render: (_: any, row: any) => (
        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={() =>
              modalDispatch({
                type: "warning",
                message: "Are you sure you want to delete this entry?",
                onConfirm: () => handleDelete(row._id || row.id),
              })
            }
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <ReusableTable
      data={entries}
      columns={columns}
      rowKey="id"
      showCheckbox={true}
      tableHeader="Risk-Based Calculated Positions"
    />
  );
};

export default RiskBasedResultsTable;
