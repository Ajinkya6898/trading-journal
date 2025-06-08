import { useState } from "react";
import { TextField, Box, Button, Stack } from "@mui/material";
import Panel from "../../ui-components/Panel";
import FieldLayout from "../../ui-components/FieldLayout";

const RiskBasedPositionSizeForm = () => {
  const [stockName, setStockName] = useState("");
  const [amount, setAmount] = useState("");
  const [entry, setEntry] = useState("");
  const [riskPercent, setRiskPercent] = useState("");
  const [stopLoss, setStopLoss] = useState("");

  const handleCalculate = () => {
    const amt = parseFloat(amount);
    const ent = parseFloat(entry);
    const risk = parseFloat(riskPercent);

    if (!amt || !ent || !risk) return;

    const riskValue = amt * (risk / 100);
    const sl = ent - riskValue / 1; // you can divide by qty if available
    setStopLoss(sl.toFixed(2));
  };

  const handleClear = () => {
    setStockName("");
    setAmount("");
    setEntry("");
    setRiskPercent("");
    setStopLoss("");
  };

  return (
    <Panel elementId="risk-based-position-size" label="Risk Based Sizing">
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

        <FieldLayout label="Total Capital at Risk">
          <TextField
            fullWidth
            placeholder="Enter amount you're risking"
            variant="outlined"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </FieldLayout>

        <FieldLayout label="Entry Price">
          <TextField
            fullWidth
            placeholder="Enter entry price"
            variant="outlined"
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
          />
        </FieldLayout>

        <FieldLayout label="Risk %">
          <TextField
            fullWidth
            placeholder="Enter risk percentage"
            variant="outlined"
            value={riskPercent}
            onChange={(e) => setRiskPercent(e.target.value)}
          />
        </FieldLayout>

        <FieldLayout label="Calculated Stop Loss">
          <TextField
            fullWidth
            value={stopLoss}
            variant="outlined"
            InputProps={{ readOnly: true }}
            placeholder="Calculated SL will appear here"
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
              Calculate SL
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
