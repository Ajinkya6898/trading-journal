import DateRangeFilter from "../../ui-components/filters/DateRangeFilter";
import ToggleFilter from "../../ui-components/filters/ToggleFilter";
import BackgroundContainer from "../../ui-components/BackgroundContainer";

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
  return (
    <BackgroundContainer
      extraStyles={{
        display: "flex",
        justifyContent: "space-between",
        margin: "20px 0",
      }}
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
    </BackgroundContainer>
  );
};

export default FundTransactionActionBar;
