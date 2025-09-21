import { useEffect } from "react";
import {
  TextField,
  Box,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Panel from "../../ui-components/Panel";
import FieldLayout from "../../ui-components/FieldLayout";
import { useRiskPositionStore } from "../../store/useRiskPositionStore";

const RiskBasedPositionSizeForm = () => {
  const {
    current,
    setField,
    calculatePositionSize,
    calculateTargets,
    calculateExitPrice,
    clearCurrent,
    saveEntry,
  } = useRiskPositionStore();

  useEffect(() => {
    const loadCapital = () => {
      const commonData = JSON.parse(localStorage.getItem("commonData") || "{}");
      if (commonData.totalCapital) {
        setField("totalCapital", commonData.totalCapital.toString());
      }
    };
    loadCapital();
    calculatePositionSize();
  }, [setField, current.riskPercent]);

  const handleCalculate = () => {
    calculatePositionSize();
    calculateTargets();
    calculateExitPrice();
    saveEntry();
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
        {/* Stock Name */}
        <FieldLayout label="Stock Name">
          <TextField
            fullWidth
            placeholder="Enter Stock Name"
            variant="outlined"
            value={current.stockName}
            onChange={(e) => setField("stockName", e.target.value)}
          />
        </FieldLayout>

        {/* Capital */}
        <FieldLayout label="Total Trading Capital (₹)">
          <TextField
            fullWidth
            variant="outlined"
            value={current.totalCapital || ""}
            InputProps={{ readOnly: true }}
          />
        </FieldLayout>

        {/* Risk % */}
        <FieldLayout label="Risk % per Trade">
          <FormControl fullWidth>
            <InputLabel>Risk %</InputLabel>
            <Select
              value={current.riskPercent}
              label="Risk %"
              onChange={(e) => setField("riskPercent", e.target.value)}
            >
              <MenuItem value="0.5">0.5%</MenuItem>
              <MenuItem value="1">1%</MenuItem>
              <MenuItem value="1.5">1.5%</MenuItem>
              <MenuItem value="2">2%</MenuItem>
            </Select>
          </FormControl>
        </FieldLayout>

        {/* Risk Amount */}
        <FieldLayout label="Risk Amount per Trade (₹)">
          <TextField
            fullWidth
            variant="outlined"
            value={current.riskAmount}
            InputProps={{ readOnly: true }}
            placeholder="Auto-calculated"
          />
        </FieldLayout>

        {/* Entry Price */}
        <FieldLayout label="Entry Price (₹)">
          <TextField
            fullWidth
            placeholder="e.g., 250"
            variant="outlined"
            value={current.entryPrice}
            onChange={(e) => setField("entryPrice", e.target.value)}
          />
        </FieldLayout>

        {/* Stop Loss Price */}
        <FieldLayout label="Stop Loss Price (₹)">
          <TextField
            fullWidth
            placeholder="e.g., 245"
            variant="outlined"
            value={current.stopLossPrice}
            onChange={(e) => setField("stopLossPrice", e.target.value)}
          />
        </FieldLayout>

        {/* Position Size */}
        <FieldLayout label="Position Size (Qty)">
          <TextField
            fullWidth
            variant="outlined"
            value={current.positionSize}
            InputProps={{ readOnly: true }}
            placeholder="Calculated quantity"
          />
        </FieldLayout>

        {/* ATR */}
        <FieldLayout label="ATR">
          <TextField
            fullWidth
            placeholder="Enter ATR value"
            variant="outlined"
            value={current.atr}
            onChange={(e) => setField("atr", e.target.value)}
          />
        </FieldLayout>

        {/* ATR Multiplier */}
        <FieldLayout label="ATR Multiplier">
          <FormControl fullWidth>
            <InputLabel>Multiplier</InputLabel>
            <Select
              value={current.atrMultiplier}
              label="Multiplier"
              onChange={(e) => setField("atrMultiplier", e.target.value)}
            >
              <MenuItem value="1">1x</MenuItem>
              <MenuItem value="2">2x</MenuItem>
              <MenuItem value="3">3x</MenuItem>
              <MenuItem value="4">4x</MenuItem>
              <MenuItem value="5">5x</MenuItem>
            </Select>
          </FormControl>
        </FieldLayout>

        {/* Partial Profit Booking */}
        <FieldLayout label="Partial Profit Booking (%)">
          <FormControl fullWidth>
            <InputLabel>Percentage</InputLabel>
            <Select
              value={current.partialPercent}
              label="Percentage"
              onChange={(e) => setField("partialPercent", e.target.value)}
            >
              {[20, 30, 40, 50, 60, 70, 80].map((percent) => (
                <MenuItem key={percent} value={percent.toString()}>
                  {percent}%
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </FieldLayout>

        {/* Exit on Returns */}
        <FieldLayout label="Exit on Returns (%)">
          <FormControl fullWidth>
            <InputLabel>Return %</InputLabel>
            <Select
              value={current.exitReturnPercent}
              label="Return %"
              onChange={(e) => setField("exitReturnPercent", e.target.value)}
            >
              {Array.from({ length: 16 }, (_, i) => i + 5).map((percent) => (
                <MenuItem key={percent} value={percent.toString()}>
                  {percent}%
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </FieldLayout>

        {/* Buttons */}
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
              onClick={clearCurrent}
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
