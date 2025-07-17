import { useState } from "react";
import { TextField, Box, Button, Stack } from "@mui/material";
import { DatePicker } from "../../ui-components/Datepicker";
import Panel from "../../ui-components/Panel";
import FieldLayout from "../../ui-components/FieldLayout";
import { useMutualFundStore } from "../../store/useMutualFundStore";

const MutualFundEntryForm = () => {
  const { current, setField, addEntry, clearForm } = useMutualFundStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addEntry();
  };

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
        onSubmit={handleSubmit}
      >
        <FieldLayout label="Fund Name" inputSize={6}>
          <TextField
            fullWidth
            placeholder="Enter Mutual Fund Name"
            variant="outlined"
            value={current.fundName}
            onChange={(e) => setField("fundName", e.target.value)}
          />
        </FieldLayout>

        <DatePicker
          label="Date"
          value={current.date}
          onChange={(newValue) => setSelectedDate(newValue)}
        />

        <FieldLayout label="Add Units">
          <TextField
            fullWidth
            placeholder="Enter number of units"
            variant="outlined"
            type="number"
            value={current.units}
            onChange={(e) => setField("units", parseFloat(e.target.value))}
          />
        </FieldLayout>

        <FieldLayout label="Add NAV">
          <TextField
            fullWidth
            placeholder="Enter NAV"
            variant="outlined"
            type="number"
            value={current.nav}
            onChange={(e) => setField("nav", parseFloat(e.target.value))}
          />
        </FieldLayout>

        <FieldLayout label="Add Amount">
          <TextField
            fullWidth
            placeholder="Enter amount"
            variant="outlined"
            type="number"
            value={current.amount}
            onChange={(e) => setField("amount", parseFloat(e.target.value))}
          />
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
              onClick={clearForm}
            >
              Clear Form
            </Button>
          </Stack>
        </FieldLayout>
      </Box>
    </Panel>
  );
};

export default MutualFundEntryForm;
