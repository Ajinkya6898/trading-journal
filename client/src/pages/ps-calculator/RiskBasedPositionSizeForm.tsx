import { useState } from "react";
import { TextField, Box, Button, Stack } from "@mui/material";
import Panel from "../../ui-components/Panel";
import FieldLayout from "../../ui-components/FieldLayout";

const RiskBasedPositionSizeForm = () => {
  const [stockName, setStockName] = useState("");
  const [totalCapital, setTotalCapital] = useState("");
  const [riskPercent, setRiskPercent] = useState("");
  const [entryPrice, setEntryPrice] = useState("");
  const [stopLossPrice, setStopLossPrice] = useState("");
  const [riskAmount, setRiskAmount] = useState("");
  const [positionSize, setPositionSize] = useState("");

  const handleCalculate = () => {
    const capital = parseFloat(totalCapital);
    const risk = parseFloat(riskPercent);
    const entry = parseFloat(entryPrice);
    const stopLoss = parseFloat(stopLossPrice);

    if (!capital || !risk || !entry || !stopLoss || stopLoss >= entry) return;

    const riskAmt = capital * (risk / 100);
    const size = Math.floor(riskAmt / (entry - stopLoss));

    setRiskAmount(riskAmt.toFixed(2));
    setPositionSize(size.toString());
  };

  const handleClear = () => {
    setStockName("");
    setTotalCapital("");
    setRiskPercent("");
    setEntryPrice("");
    setStopLossPrice("");
    setRiskAmount("");
    setPositionSize("");
  };

  return (
    <Panel
      elementId="risk-based-position-size"
      label="Risk-Based Position Sizing"
    >
      <Box
        component="form"
        noValidate
        autoComplete="off"
        mt={2}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <FieldLayout label="Stock Name">
          <TextField
            fullWidth
            placeholder="Enter Stock Name"
            variant="outlined"
            value={stockName}
            onChange={(e) => setStockName(e.target.value)}
          />
        </FieldLayout>

        <FieldLayout label="Total Trading Capital (₹)">
          <TextField
            fullWidth
            placeholder="e.g., 500000"
            variant="outlined"
            value={totalCapital}
            onChange={(e) => setTotalCapital(e.target.value)}
          />
        </FieldLayout>

        <FieldLayout label="Risk % per Trade">
          <TextField
            fullWidth
            placeholder="e.g., 1"
            variant="outlined"
            value={riskPercent}
            onChange={(e) => setRiskPercent(e.target.value)}
          />
        </FieldLayout>

        <FieldLayout label="Risk Amount per Trade (₹)">
          <TextField
            fullWidth
            variant="outlined"
            value={riskAmount}
            InputProps={{ readOnly: true }}
            placeholder="Auto-calculated"
          />
        </FieldLayout>

        <FieldLayout label="Entry Price (₹)">
          <TextField
            fullWidth
            placeholder="e.g., 250"
            variant="outlined"
            value={entryPrice}
            onChange={(e) => setEntryPrice(e.target.value)}
          />
        </FieldLayout>

        <FieldLayout label="Stop Loss Price (₹)">
          <TextField
            fullWidth
            placeholder="e.g., 245"
            variant="outlined"
            value={stopLossPrice}
            onChange={(e) => setStopLossPrice(e.target.value)}
          />
        </FieldLayout>

        <FieldLayout label="Position Size (Qty)">
          <TextField
            fullWidth
            variant="outlined"
            value={positionSize}
            InputProps={{ readOnly: true }}
            placeholder="Calculated quantity"
          />
        </FieldLayout>

        <FieldLayout>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              type="button"
              onClick={handleCalculate}
            >
              Calculate
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="large"
              fullWidth
              onClick={handleClear}
            >
              Clear
            </Button>
          </Stack>
        </FieldLayout>
      </Box>
    </Panel>
  );
};

export default RiskBasedPositionSizeForm;
