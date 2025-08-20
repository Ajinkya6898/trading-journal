import {
  TextField,
  Box,
  Button,
  Stack,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import Panel from "../../ui-components/Panel";
import FieldLayout from "../../ui-components/FieldLayout";
import { usePositionStore } from "../../store/usepositionStore";
import { useModal } from "../../ui-components/ModalProvider";

const EqualMoneyPositionSizeForm = () => {
  const {
    current,
    setField,
    calculatePositionSize,
    calculateTargets,
    clearCurrent,
    saveEntry,
  } = usePositionStore();

  const { modalDispatch } = useModal();

  const handleCalculate = async () => {
    const { stockName, investAmount, stockPrice } =
      usePositionStore.getState().current;

    const missingFields: string[] = [];
    if (!stockName) missingFields.push("Stock Name");
    if (!investAmount) missingFields.push("Amount to Invest");
    if (!stockPrice) missingFields.push("Stock Price");

    if (missingFields.length > 0) {
      modalDispatch({
        type: "error",
        message: (
          <div style={{ textAlign: "left" }}>
            <Typography variant="body1">
              Cannot proceed — the following required fields are missing:
            </Typography>
            <ul style={{ margin: 0, marginTop: "16px" }}>
              {missingFields.map((field) => (
                <li key={field}>
                  <Typography variant="body2" component="span">
                    {field}
                  </Typography>
                </li>
              ))}
            </ul>
          </div>
        ),
      });
      return;
    }

    calculatePositionSize();
    calculateTargets();

    try {
      await saveEntry();
      modalDispatch({
        type: "success",
        message: "Position size calculated and saved successfully!",
      });
    } catch (err) {
      modalDispatch({
        type: "error",
        message: "Failed to save entry. Please try again.",
      });
    }
  };

  return (
    <Panel
      elementId="equal-money-position-size"
      label="Equal Money Based Sizing"
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
            value={current.stockName}
            onChange={(e) => setField("stockName", e.target.value)}
          />
        </FieldLayout>

        <FieldLayout label="Amount to Invest in Stock">
          <TextField
            fullWidth
            placeholder="Enter amount you want to invest"
            variant="outlined"
            value={current.investAmount}
            onChange={(e) => setField("investAmount", e.target.value)}
          />
        </FieldLayout>

        <FieldLayout label="Stock Price">
          <TextField
            fullWidth
            placeholder="Enter current stock price"
            variant="outlined"
            value={current.stockPrice}
            onChange={(e) => setField("stockPrice", e.target.value)}
          />
        </FieldLayout>

        <FieldLayout label="ATR">
          <TextField
            fullWidth
            placeholder="Enter ATR value"
            variant="outlined"
            value={current.atr}
            onChange={(e) => setField("atr", e.target.value)}
          />
        </FieldLayout>

        <FieldLayout label="ATR Multiplier">
          <FormControl fullWidth>
            <InputLabel>Multiplier</InputLabel>
            <Select
              value={current.atrMultiplier || "1"}
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

        {/* Partial Profit Booking % */}
        <FieldLayout label="Partial Profit Booking (%)">
          <FormControl fullWidth>
            <InputLabel>Percentage</InputLabel>
            <Select
              value={current.partialPercent || "50"}
              label="Percentage"
              onChange={(e) => setField("partialPercent", e.target.value)}
            >
              {[20, 30, 40, 50, 60, 70, 80].map((percent) => (
                <MenuItem key={percent} value={percent}>
                  {percent}%
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
              Calculate Position Size
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

export default EqualMoneyPositionSizeForm;
