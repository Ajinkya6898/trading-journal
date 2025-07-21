import { Stack, Typography, Button } from "@mui/material";
import { DatePicker } from "../Datepicker";

type DateRangeFilterProps = {
  fromDate: Date | null;
  toDate: Date | null;
  onFromDateChange: (date: Date | null) => void;
  onToDateChange: (date: Date | null) => void;
  onApply: () => void;
  disableFuture?: boolean;
};

const DateRangeFilter = ({
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
  onApply,
  disableFuture = true,
}: DateRangeFilterProps) => {
  return (
    <Stack direction="row" alignItems="center" gap={1}>
      <DatePicker
        value={fromDate}
        onChange={onFromDateChange}
        variant="small"
        disableFutureDate={disableFuture}
        noLayout
      />

      <Typography
        variant="body1"
        sx={{ mx: 0.5, fontWeight: 500, fontSize: "1rem" }}
      >
        -
      </Typography>

      <DatePicker
        value={toDate}
        onChange={onToDateChange}
        variant="small"
        disableFutureDate={disableFuture}
        noLayout
      />

      <Button
        id="date-range-apply"
        onClick={onApply}
        variant="contained"
        sx={{ minWidth: 64 }}
      >
        Apply
      </Button>
    </Stack>
  );
};

export default DateRangeFilter;
