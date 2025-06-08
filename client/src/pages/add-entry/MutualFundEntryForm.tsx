import { useState } from "react";
import { TextField, Box, Button, Stack } from "@mui/material";
import { DatePicker } from "../../ui-components/Datepicker";
import Panel from "../../ui-components/Panel";
import FieldLayout from "../../ui-components/FieldLayout";

const MutualFundEntryForm = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <Panel elementId="mutual-fund-entry" label="Mutual Fund">
      <Box
        component="form"
        noValidate
        autoComplete="off"
        mt={2}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <FieldLayout label="Fund Name" inputSize={6}>
          <TextField
            fullWidth
            placeholder="Enter Mutual Fund Name"
            variant="outlined"
          />
        </FieldLayout>
        <DatePicker
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

        <FieldLayout label="Add NAV">
          <TextField fullWidth placeholder="Enter NAV" variant="outlined" />
        </FieldLayout>

        <FieldLayout label="Add Amuout">
          <TextField fullWidth placeholder="Enter amount" variant="outlined" />
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

export default MutualFundEntryForm;
