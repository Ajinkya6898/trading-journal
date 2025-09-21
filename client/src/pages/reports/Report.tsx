import { useEffect } from "react";
import useDashboardStore from "../../store/useDashboardStore";
import PageHeader from "../../ui-components/PageHeader";
import TradingStatsDashboard from "./TradingStatsDashboard";

const Report = () => {
  const { reportData, fetchDashboardTrades } = useDashboardStore();

  useEffect(() => {
    fetchDashboardTrades();
  }, []);

  return (
    <>
      <PageHeader title="Reports" />
      <TradingStatsDashboard tradingStats={reportData} />
    </>
  );
};

export default Report;
