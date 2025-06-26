import { useEffect } from "react";
import ReusableTable from "../../ui-components/ReusableTable";
import { usePositionStore } from "../../store/positionStore";
import { Button, Stack } from "@mui/material";
import { useModal } from "../../ui-components/ModalProvider";

const EqualMoneyResultsTable = () => {
  const entries = usePositionStore((state) => state.entries);
  const loadEntries = usePositionStore((state) => state.loadEntries);

  const { modalDispatch } = useModal();

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:8080/api/positions/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const err = await res.json();
        console.error("Delete failed:", err);
        modalDispatch({
          type: "error",
          message: err.message || "Failed to delete entry.",
        });
        return;
      }

      usePositionStore.setState((state) => ({
        entries: state.entries.filter((entry) => entry.id !== id),
      }));

      await loadEntries();

      modalDispatch({
        type: "success",
        message: "Entry deleted successfully!",
      });
    } catch (error) {
      console.error("Delete error:", error);
      modalDispatch({
        type: "error",
        message: "Server error. Please try again later.",
      });
    }
  };

  const columns = [
    {
      id: "id",
      label: "ID",
      render: (_: any, __: any, rowIndex: number) => rowIndex + 1,
    },

    { id: "stockName", label: "Stock Name" },
    { id: "totalAmount", label: "Total Amount" },
    { id: "investAmount", label: "Invested Amount" },
    { id: "stockPrice", label: "Stock Price" },
    { id: "positionSize", label: "Position Size" },
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
                onConfirm: () => handleDelete(row._id),
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
    <div style={{ marginTop: "2rem" }}>
      <ReusableTable
        data={entries}
        columns={columns}
        rowKey="id"
        showCheckbox={true}
        tableHeader="Calculated Positions"
      />
    </div>
  );
};

export default EqualMoneyResultsTable;
