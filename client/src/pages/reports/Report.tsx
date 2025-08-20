import PageHeader from "../../ui-components/PageHeader";
import TradingStatsDashboard from "./TradingStatsDashboard";

const Report = () => {
  return (
    <>
      <PageHeader title="Reports" />
      <TradingStatsDashboard tradingStats={null} />
    </>
  );
};

export default Report;
