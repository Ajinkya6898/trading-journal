import { useState } from "react";
import { TextField, Box, Button, Stack } from "@mui/material";
import { DatePicker } from "../../ui-components/Datepicker";
import Panel from "../../ui-components/Panel";
import FieldLayout from "../../ui-components/FieldLayout";
import useStockStore from "../../store/useStockStore";

const StockEntryForm = () => {
  const [formValues, setFormValues] = useState({
    entryDate: new Date(),
    exitDate: new Date(),
    symbol: "",
    quantity: "",
    boughtPrice: "",
    soldPrice: "",
    pnl: "",
    commission: "",
    notes: "",
    tradeImage: null as File | null,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { addTrade } = useStockStore();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formValues.symbol.trim()) {
      newErrors.symbol = "Symbol is required.";
    }

    if (!formValues.quantity || isNaN(Number(formValues.quantity))) {
      newErrors.quantity = "Valid quantity is required.";
    }

    if (!formValues.boughtPrice || isNaN(Number(formValues.boughtPrice))) {
      newErrors.boughtPrice = "Valid bought price is required.";
    }

    if (!formValues.soldPrice || isNaN(Number(formValues.soldPrice))) {
      newErrors.soldPrice = "Valid sold price is required.";
    }

    if (formValues.quantity && Number(formValues.quantity) <= 0) {
      newErrors.quantity = "Quantity must be greater than 0.";
    }

    if (!formValues.pnl || isNaN(Number(formValues.pnl))) {
      newErrors.pnl = "Valid pnl is required.";
    }

    if (
      formValues.entryDate &&
      formValues.exitDate &&
      formValues.exitDate < formValues.entryDate
    ) {
      newErrors.exitDate = "Exit date cannot be before entry date.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await addTrade({
          entryDate: formValues.entryDate,
          exitDate: formValues.exitDate,
          symbol: formValues.symbol,
          quantity: Number(formValues.quantity),
          boughtPrice: Number(formValues.boughtPrice),
          soldPrice: Number(formValues.soldPrice),
          pnl: Number(formValues.pnl),
          commission: Number(formValues.commission),
          notes: formValues.notes,
          tradeImage: formValues.tradeImage, // file can be null
        });

        console.log("Trade added successfully");

        // Clear form after successful submission
        setFormValues({
          entryDate: new Date(),
          exitDate: new Date(),
          symbol: "",
          quantity: "",
          boughtPrice: "",
          soldPrice: "",
          pnl: "",
          commission: "",
          notes: "",
          tradeImage: null,
        });
      } catch (error) {
        console.error("Error adding trade:", error);
      }
    } else {
      console.warn("Form has errors");
    }
  };

  return (
    <Panel elementId="stock-entry" label="Stocks" forceOpen={true}>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        mt={2}
        display="flex"
        flexDirection="column"
        onSubmit={handleSubmit}
        gap={2}
      >
        <DatePicker
          label="Entry Date"
          value={formValues.entryDate}
          variant="small"
          onChange={(newValue) => handleChange("entryDate", newValue)}
        />
        <DatePicker
          label="Exit Date"
          value={formValues.exitDate}
          variant="small"
          onChange={(newValue) => handleChange("exitDate", newValue)}
          error={errors.exitDate}
        />
        <FieldLayout label="Days Hold" inputSize={2}>
          <TextField
            fullWidth
            placeholder="Hold"
            variant="outlined"
            type="number"
            value={
              formValues.entryDate && formValues.exitDate
                ? Math.max(
                    Math.ceil(
                      (formValues.exitDate.getTime() -
                        formValues.entryDate.getTime()) /
                        (1000 * 60 * 60 * 24)
                    ),
                    0
                  )
                : ""
            }
            disabled
          />
        </FieldLayout>
        <FieldLayout label="Symbol" helperText={errors.symbol}>
          <TextField
            fullWidth
            placeholder="Enter stock symbol"
            variant="outlined"
            value={formValues.symbol}
            onChange={(e) => handleChange("symbol", e.target.value)}
            error={!!errors.symbol}
          />
        </FieldLayout>
        <FieldLayout label="Quantity" helperText={errors.quantity}>
          <TextField
            fullWidth
            placeholder="Enter quantity"
            variant="outlined"
            type="number"
            value={formValues.quantity}
            onChange={(e) => handleChange("quantity", e.target.value)}
            error={!!errors.quantity}
          />
        </FieldLayout>
        <FieldLayout label="Bought Price" helperText={errors.boughtPrice}>
          <TextField
            fullWidth
            placeholder="Enter bought price"
            variant="outlined"
            type="number"
            value={formValues.boughtPrice}
            onChange={(e) => handleChange("boughtPrice", e.target.value)}
            error={!!errors.boughtPrice}
          />
        </FieldLayout>
        <FieldLayout label="Sold Price" helperText={errors.soldPrice}>
          <TextField
            fullWidth
            placeholder="Enter sold price"
            variant="outlined"
            type="number"
            value={formValues.soldPrice}
            onChange={(e) => handleChange("soldPrice", e.target.value)}
            error={!!errors.soldPrice}
          />
        </FieldLayout>
        <FieldLayout label="P&L" inputSize={2} helperText={errors.pnl}>
          <TextField
            fullWidth
            placeholder="Enter P&L"
            variant="outlined"
            type="number"
            value={formValues.pnl}
            onChange={(e) => handleChange("pnl", e.target.value)}
            error={!!errors.pnl}
          />
        </FieldLayout>
        <FieldLayout label="Commission" inputSize={2}>
          <TextField
            fullWidth
            placeholder="Enter commission"
            variant="outlined"
            type="number"
            value={formValues.commission}
            onChange={(e) => handleChange("commission", e.target.value)}
          />
        </FieldLayout>
        <FieldLayout label="Realised P&L" inputSize={2}>
          <TextField
            fullWidth
            placeholder="Enter realised P&L"
            variant="outlined"
            type="number"
            value={
              Number(formValues.pnl || 0) - Number(formValues.commission || 0)
            }
            disabled
          />
        </FieldLayout>
        <FieldLayout label="Rupees at Work">
          <TextField
            fullWidth
            placeholder="Enter rupees at work"
            variant="outlined"
            type="number"
            value={
              Number(formValues.quantity || 0) *
              Number(formValues.boughtPrice || 0)
            }
          />
        </FieldLayout>
        <FieldLayout label="Notes">
          <TextField
            fullWidth
            multiline
            minRows={6}
            placeholder="Enter any notes here"
            variant="outlined"
            value={formValues.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
          />
        </FieldLayout>

        <FieldLayout label="Trade Image">
          <Button variant="outlined" component="label" fullWidth>
            Browse File
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) =>
                handleChange("tradeImage", e.target.files?.[0] || null)
              }
            />
          </Button>
        </FieldLayout>

        <FieldLayout>
          <Stack display="flex" flexDirection="row" gap={2}>
            <Button variant="contained" size="large" fullWidth type="submit">
              Submit
            </Button>
            <Button
              color="error"
              variant="outlined"
              size="large"
              fullWidth
              onClick={() =>
                setFormValues({
                  entryDate: new Date(),
                  exitDate: new Date(),
                  symbol: "",
                  quantity: "",
                  boughtPrice: "",
                  soldPrice: "",
                  pnl: "",
                  commission: "",
                  notes: "",
                  tradeImage: null,
                })
              }
            >
              Clear Form
            </Button>
          </Stack>
        </FieldLayout>
      </Box>
    </Panel>
  );
};

export default StockEntryForm;
