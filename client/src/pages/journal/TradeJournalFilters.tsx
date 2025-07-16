import {
  TextField,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
} from "@mui/material";
import { DatePicker } from "../../ui-components/Datepicker";
import BackgroundContainer from "../../ui-components/BackgroundContainer";

type TradeJournalFiltersProps = {
  winLossType: "All" | "Only Winners" | "Only Losers";
  onWinLossTypeChange: (type: "All" | "Only Winners" | "Only Losers") => void;
  tradeType: "Intraday" | "Swing" | "Positional" | "Investment";
  onTradeTypeChange: (
    type: "Intraday" | "Swing" | "Positional" | "Investment"
  ) => void;
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
};

const tradeTypes = ["Intraday", "Swing", "Positional", "Investment"];

const TradeJournalFilters = ({
  winLossType,
  onWinLossTypeChange,
  tradeType,
  onTradeTypeChange,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: TradeJournalFiltersProps) => {
  return (
    <BackgroundContainer
      extraStyles={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
        gap: 16,
      }}
    >
      <div>
        <ToggleButtonGroup
          value={winLossType}
          exclusive
          onChange={(e, newValue) => {
            if (newValue !== null) onWinLossTypeChange(newValue);
          }}
          size="small"
          color="primary"
        >
          <ToggleButton value="All">All</ToggleButton>
          <ToggleButton value="Only Winners">Winners</ToggleButton>
          <ToggleButton value="Only Losers">Losers</ToggleButton>
        </ToggleButtonGroup>

        <TextField
          select
          value={tradeType}
          onChange={(e) => onTradeTypeChange(e.target.value as any)}
          size="small"
          sx={{ minWidth: 160, ml: "20px" }}
          label="Trade Type"
        >
          {tradeTypes.map((t) => (
            <MenuItem key={t} value={t}>
              {t}
            </MenuItem>
          ))}
        </TextField>
      </div>

      {/* Date Pickers */}
      <Stack direction="row">
        <DatePicker
          label="Start Date"
          value={startDate}
          variant="small"
          onChange={onStartDateChange}
          inputSize={8}
          labelSize={4}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          variant="small"
          onChange={onEndDateChange}
          inputSize={8}
          labelSize={4}
        />
      </Stack>
    </BackgroundContainer>
  );
};

export default TradeJournalFilters;
