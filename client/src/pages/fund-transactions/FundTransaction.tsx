import { useState, useEffect } from "react";
import FundTransactionForm from "./FundTransactionForm";
import FundTransactionTable from "./FundTransactionTable";
import FundTransactionActionBar from "./FundTransactionsActionBar";
import { useFundTransactionStore } from "../../store/useFundTransactionStore";

const FundTransaction = () => {
  const [broker, setBroker] = useState("All");
  const [type, setType] = useState<"Add" | "Withdraw" | "All">("All");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const { fetchTransactions } = useFundTransactionStore();

  useEffect(() => {
    fetchTransactions({
      broker,
      type,
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
    });
  }, [broker, type, startDate, endDate]);

  const handleDateRangeApply = () => {
    fetchTransactions({
      broker,
      type,
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
    });
  };

  return (
    <>
      <FundTransactionForm />
      <FundTransactionActionBar
        brokerFilter={{
          value: broker,
          onChange: setBroker,
          options: ["All", "Zerodha", "Dhan", "Groww"],
        }}
        transactionTypeFilter={{
          value: type,
          onChange: setType,
        }}
        dateRangeFilter={{
          fromDate: startDate,
          toDate: endDate,
          onFromDateChange: setStartDate,
          onToDateChange: setEndDate,
          onApply: handleDateRangeApply,
        }}
      />
      <FundTransactionTable />
    </>
  );
};

export default FundTransaction;
