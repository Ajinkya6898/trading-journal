import { useState } from "react";
import { TextField, Box, Button, Stack, MenuItem } from "@mui/material";
import { DatePicker } from "../../ui-components/Datepicker";
import Panel from "../../ui-components/Panel";
import FieldLayout from "../../ui-components/FieldLayout";

const ETFEntryForm = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <Panel elementId="etf-entry" label="ETF">
      <Box
        component="form"
        noValidate
        autoComplete="off"
        mt={2}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <FieldLayout label="ETF Name" inputSize={6}>
          <TextField
            fullWidth
            placeholder="Enter ETF Name"
            variant="outlined"
          />
        </FieldLayout>

        <DatePicker
          label="Entry Date"
          value={selectedDate}
          variant="small"
          onChange={(newValue) => setSelectedDate(newValue)}
        />

        <FieldLayout label="Add Units">
          <TextField
            fullWidth
            placeholder="Enter number of units"
            variant="outlined"
          />
        </FieldLayout>

        <FieldLayout label="Price per Unit">
          <TextField fullWidth placeholder="Enter price" variant="outlined" />
        </FieldLayout>

        <FieldLayout label="Total Amount">
          <TextField fullWidth placeholder="Enter amount" variant="outlined" />
        </FieldLayout>

        <FieldLayout label="Exchange">
          <TextField fullWidth select defaultValue="NSE" variant="outlined">
            <MenuItem value="NSE">NSE</MenuItem>
            <MenuItem value="BSE">BSE</MenuItem>
            <MenuItem value="NYSE">NYSE</MenuItem>
            <MenuItem value="NASDAQ">NASDAQ</MenuItem>
          </TextField>
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

export default ETFEntryForm;
