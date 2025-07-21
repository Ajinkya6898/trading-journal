import { useState } from "react";
import { TextField, Box, Button, Stack, MenuItem } from "@mui/material";
import { DatePicker } from "../../ui-components/Datepicker";
import Panel from "../../ui-components/Panel";
import FieldLayout from "../../ui-components/FieldLayout";

const CryptoEntryForm = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <Panel elementId="crypto-entry" label="Crypto">
      <Box
        component="form"
        noValidate
        autoComplete="off"
        mt={2}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <FieldLayout label="Token Name" inputSize={6}>
          <TextField
            fullWidth
            placeholder="e.g., BTC, ETH"
            variant="outlined"
          />
        </FieldLayout>

        <DatePicker
          label="Entry Date"
          value={selectedDate}
          variant="small"
          onChange={(newValue) => setSelectedDate(newValue)}
        />

        <FieldLayout label="Amount Invested">
          <TextField fullWidth placeholder="Enter amount" variant="outlined" />
        </FieldLayout>

        <FieldLayout label="Quantity">
          <TextField
            fullWidth
            placeholder="Enter quantity"
            variant="outlined"
          />
        </FieldLayout>

        <FieldLayout label="Price per Coin">
          <TextField fullWidth placeholder="Enter price" variant="outlined" />
        </FieldLayout>

        <FieldLayout label="Exchange">
          <TextField fullWidth select defaultValue="Binance" variant="outlined">
            <MenuItem value="Binance">Binance</MenuItem>
            <MenuItem value="Coinbase">Coinbase</MenuItem>
            <MenuItem value="WazirX">WazirX</MenuItem>
            <MenuItem value="Kraken">Kraken</MenuItem>
          </TextField>
        </FieldLayout>

        <FieldLayout label="Wallet Address (Optional)">
          <TextField
            fullWidth
            placeholder="Enter wallet address"
            variant="outlined"
          />
        </FieldLayout>

        <FieldLayout>
          <Stack display="flex" flexDirection="row" gap={2}>
            <Button variant="contained" size="large" fullWidth type="submit">
              Submit
            </Button>
            <Button color="error" variant="outlined" size="large" fullWidth>
              Clear Form
            </Button>
          </Stack>
        </FieldLayout>
      </Box>
    </Panel>
  );
};

export default CryptoEntryForm;
