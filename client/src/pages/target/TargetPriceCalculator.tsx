import { useState } from "react";
import { Box, Button, MenuItem, Stack, TextField } from "@mui/material";
import Panel from "../../ui-components/Panel";
import FieldLayout from "../../ui-components/FieldLayout";

const riskRewardOptions = [
  { label: "1:1", value: 1 },
  { label: "1:1.5", value: 1.5 },
  { label: "1:2", value: 2 },
];

const TargetPriceCalculator = () => {
  const [entryPrice, setEntryPrice] = useState<string>("");
  const [stopLoss, setStopLoss] = useState<string>("");
  const [rrRatio, setRrRatio] = useState<number>(1);

  const targetPrice =
    entryPrice && stopLoss
      ? (
          Number(entryPrice) +
          (Number(entryPrice) - Number(stopLoss)) * rrRatio
        ).toFixed(2)
      : "";

  const handleClear = () => {
    setEntryPrice("");
    setStopLoss("");
    setRrRatio(1);
  };

  return (
    <Panel
      label="Target Price Calculator"
      elementId="target-calculator"
      forceOpen
    >
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        mt={2}
        component="form"
        autoComplete="off"
      >
        <FieldLayout label="Entry Price">
          <TextField
            fullWidth
            placeholder="Enter entry price"
            variant="outlined"
            type="number"
            value={entryPrice}
            onChange={(e) => setEntryPrice(e.target.value)}
          />
        </FieldLayout>

        <FieldLayout label="Stoploss">
          <TextField
            fullWidth
            placeholder="Enter stoploss"
            variant="outlined"
            type="number"
            value={stopLoss}
            onChange={(e) => setStopLoss(e.target.value)}
          />
        </FieldLayout>

        <FieldLayout label="Risk Reward Ratio">
          <TextField
            fullWidth
            select
            value={rrRatio}
            onChange={(e) => setRrRatio(Number(e.target.value))}
          >
            {riskRewardOptions.map((option) => (
              <MenuItem key={option.label} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </FieldLayout>

        <FieldLayout label="Target Price">
          <TextField
            fullWidth
            value={targetPrice}
            variant="outlined"
            disabled
          />
        </FieldLayout>

        <FieldLayout>
          <Stack direction="row" gap={2}>
            <Button variant="contained" fullWidth type="submit" disabled>
              Calculate
            </Button>
            <Button
              variant="outlined"
              color="error"
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

export default TargetPriceCalculator;
