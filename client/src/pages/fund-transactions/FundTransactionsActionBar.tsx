import DateRangeFilter from "../../ui-components/filters/DateRangeFilter";
import ToggleFilter from "../../ui-components/filters/ToggleFilter";
import { Paper, Stack, useMediaQuery, useTheme } from "@mui/material";

type FundTransactionActionBarProps = {
  brokerFilter?: {
    value: string;
    onChange: (val: string) => void;
    options: string[];
    label?: string;
  };
  transactionTypeFilter?: {
    value: "Add" | "Withdraw" | "All";
    onChange: (val: "Add" | "Withdraw" | "All") => void;
    label?: string;
  };
  dateRangeFilter?: {
    fromDate: Date | null;
    toDate: Date | null;
    onFromDateChange: (val: Date | null) => void;
    onToDateChange: (val: Date | null) => void;
    onApply: () => void;
  };
};

const FundTransactionActionBar = ({
  brokerFilter,
  transactionTypeFilter,
  dateRangeFilter,
}: FundTransactionActionBarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Paper
      elevation={0}
      sx={{
        px: 3,
        py: 4,
        borderRadius: 3,
        background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
        border: "1px solid",
        borderColor: "divider",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: "linear-gradient(90deg, #1976d2, #42a5f5)",
        },
      }}
    >
      <Stack
        direction={isMobile ? "column" : "row"}
        spacing={3}
        alignItems={isMobile ? "stretch" : "flex-start"}
        justifyContent="space-between"
      >
        {brokerFilter && (
          <ToggleFilter
            label={brokerFilter.label ?? "Broker"}
            value={brokerFilter.value}
            onChange={brokerFilter.onChange}
            options={brokerFilter.options.map((b) => ({
              label: b,
              value: b,
            }))}
          />
        )}
        {transactionTypeFilter && (
          <ToggleFilter
            label={transactionTypeFilter.label ?? "Type"}
            value={transactionTypeFilter.value}
            onChange={transactionTypeFilter.onChange}
            options={[
              { label: "All", value: "All" },
              { label: "Add", value: "Add" },
              { label: "Withdraw", value: "Withdraw" },
            ]}
          />
        )}
        {dateRangeFilter && (
          <DateRangeFilter
            fromDate={dateRangeFilter.fromDate}
            toDate={dateRangeFilter.toDate}
            onFromDateChange={dateRangeFilter.onFromDateChange}
            onToDateChange={dateRangeFilter.onToDateChange}
            onApply={dateRangeFilter.onApply}
          />
        )}
      </Stack>
    </Paper>
  );
};

export default FundTransactionActionBar;
