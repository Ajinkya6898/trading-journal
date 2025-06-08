import { useState } from "react";
import { TextField, Box, Button, Stack } from "@mui/material";
import Panel from "../../ui-components/Panel";
import FieldLayout from "../../ui-components/FieldLayout";

const EqualMoneyPositionSizeForm = () => {
  const [stockName, setStockName] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [investAmount, setInvestAmount] = useState("");
  const [positionSize, setPositionSize] = useState("");

  const handleInvestAmountChange = (value: string) => {
    setInvestAmount(value);
  };

  const handleCalculate = () => {
    const total = parseFloat(totalAmount);

    if (!stockName || !total) return;

    let posSize = 0;

    setPositionSize(posSize.toFixed(2));
  };

  const handleClear = () => {
    setStockName("");
    setTotalAmount("");
    setInvestAmount("");
    setPositionSize("");
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
            value={stockName}
            onChange={(e) => setStockName(e.target.value)}
          />
        </FieldLayout>

        <FieldLayout label="Total Amount to Invest">
          <TextField
            fullWidth
            placeholder="Enter total capital available"
            variant="outlined"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
          />
        </FieldLayout>

        <FieldLayout label="Amount to Invest in Stock">
          <TextField
            fullWidth
            placeholder="Enter amount you want to invest"
            variant="outlined"
            value={investAmount}
            onChange={(e) => handleInvestAmountChange(e.target.value)}
          />
        </FieldLayout>

        <FieldLayout label="Calculated Position Size">
          <TextField
            fullWidth
            value={positionSize}
            variant="outlined"
            InputProps={{ readOnly: true }}
            placeholder="Position size will be calculated here"
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
              Calculate Position Size
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

export default EqualMoneyPositionSizeForm;
