import {
  TextField,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
} from "@mui/material";
import { DatePicker } from "../../ui-components/Datepicker";
import BackgroundContainer from "../../ui-components/BackgroundContainer";

type FundTransactionFiltersProps = {
  broker: string;
  onBrokerChange: (broker: string) => void;
  type: "Add" | "Withdraw" | "All";
  onTypeChange: (type: "Add" | "Withdraw" | "All") => void;
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
};

const brokers = ["All", "Zerodha", "Dhan", "Groww", "Upstox", "Other"];

const FundTransactionFilters = ({
  broker,
  onBrokerChange,
  type,
  onTypeChange,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: FundTransactionFiltersProps) => {
  return (
    <BackgroundContainer extraStyles={{ display: "flex", padding: "20px" }}>
      <TextField
        select
        value={broker}
        onChange={(e) => onBrokerChange(e.target.value)}
        size="small"
        sx={{ minWidth: 160 }}
      >
        {brokers.map((b) => (
          <MenuItem key={b} value={b}>
            {b}
          </MenuItem>
        ))}
      </TextField>

      <ToggleButtonGroup
        value={type}
        exclusive
        onChange={(e, newValue) => {
          if (newValue !== null) onTypeChange(newValue);
        }}
        size="small"
        color="primary"
      >
        <ToggleButton value="All">All</ToggleButton>
        <ToggleButton value="Add">Add</ToggleButton>
        <ToggleButton value="Withdraw">Withdraw</ToggleButton>
      </ToggleButtonGroup>

      <Stack direction="row">
        <DatePicker
          label="Start Date"
          value={startDate}
          variant="small"
          onChange={onStartDateChange}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          variant="small"
          onChange={onEndDateChange}
        />
      </Stack>
    </BackgroundContainer>
  );
};

export default FundTransactionFilters;
