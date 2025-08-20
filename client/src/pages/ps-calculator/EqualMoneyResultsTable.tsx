import { useEffect } from "react";
import ReusableTable from "../../ui-components/ReusableTable";
import { usePositionStore } from "../../store/usepositionStore";
import { Button, Stack } from "@mui/material";
import { useModal } from "../../ui-components/ModalProvider";
import axiosInstance from "../../store/axiosInstance";

const EqualMoneyResultsTable = () => {
  const entries = usePositionStore((state) => state.entries);
  const loadEntries = usePositionStore((state) => state.loadEntries);

  const { modalDispatch } = useModal();

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  const handleDelete = async (id: string) => {
    try {
      const res = await axiosInstance.delete(`/positions/${id}`);

      usePositionStore.setState((state) => ({
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
    { id: "investAmount", label: "Total Amount" },
    { id: "stockPrice", label: "Entry" },
    { id: "positionSize", label: "Position Size" },
    { id: "atr", label: "ATR" },
    { id: "atrMultiplier", label: "ATR Multiplier" },
    { id: "partialTarget", label: "Partial Target" },
    { id: "partialSellQty", label: "Partial QTY" },
    { id: "hardsl", label: "Hard SL" },
    {
      id: "createdAt",
      label: "Date",
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
    {
      id: "actions",
      label: "Actions",
      render: (_: any, row: any) => (
        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            variant="outlined"
            color="primary"
            onClick={() => alert("Edit not implemented")}
          >
            Edit
          </Button>
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
      tableHeader="Calculated Positions"
    />
  );
};

export default EqualMoneyResultsTable;
