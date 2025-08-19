import { useEffect, useState } from "react";
import { stockJournalColumns } from "./StockJournalColumns";
import ReusableTable from "../../ui-components/ReusableTable";
import useStockStore from "../../store/useStockStore";
import Loader from "../../ui-components/Loader";
import TradingPerformanceDashboard from "./TradingPerformanceDashboard";
import TradeJournalFilters from "./TradeJournalFilters";

const StocksTradingJournalTable = () => {
  const [winLossType, setWinLossType] = useState<
    "All" | "Only Winners" | "Only Losers"
  >("All");
  const [tradeType, setTradeType] = useState<
    "Intraday" | "Swing" | "Positional" | "Investment"
  >("Intraday");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const { trades, fetchTrades, loading, summary } = useStockStore();

  useEffect(() => {
    fetchTrades();
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <TradingPerformanceDashboard data={summary} />
      <TradeJournalFilters
        winLossType={winLossType}
        onWinLossTypeChange={setWinLossType}
        tradeType={tradeType}
        onTradeTypeChange={setTradeType}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />

      {/* <ReusableTable
        columns={stockJournalColumns}
        data={trades}
        rowKey="id"
        tableHeader="My Trading Journal"
        showCheckbox={false}
      /> */}
      <ReusableTable
        columns={stockJournalColumns}
        data={trades}
        showPagination={true}
        itemsPerPageOptions={[25, 50, 100]}
        paginationId="my-table"
        navigationConstant="NAV_CONSTANT"
        paginationConstant="PAGE_CONSTANT"
      />
    </>
  );
};

export default StocksTradingJournalTable;
