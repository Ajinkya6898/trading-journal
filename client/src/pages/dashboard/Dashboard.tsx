import { useEffect } from "react";
import { Box, Stack } from "@mui/material";
import PageHeader from "../../ui-components/PageHeader";
import DashboardStats from "./DashboardStats";
import Icon from "../../ui-components/Icon";
import ActiveTrades from "./ActiveTrades";
import AssetReturnsFunnel from "./AssetReturnsFunnel";
import TradesAndInvestments from "./TradesAndInvestments";
import PerformanceOverview from "./PerformanceOverview";
import TopGainersLosers from "./TopGainersLosers";
import useDashboardStore from "../../store/useDashboardStore";
import Loader from "../../ui-components/Loader";
// import TradingStatsDashboard from "../reports/TradingStatsDashboard";
import PeriodStatsDashboard from "./PeriodStatsDashboard";
import TradingPerformanceDashboard from "./PerformanceTable";
import MonthlyTradeStatsChart from "./MonthlyTradeStatsChart";

const Dashboard = () => {
  const { trades, dashBoardData, loading, error, fetchDashboardTrades } =
    useDashboardStore();

  console.log("trades", trades);

  useEffect(() => {
    fetchDashboardTrades();
  }, []);
  if (loading)
    return (
      <>
        <Loader />
      </>
    );
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <>
      <PageHeader
        title="Dashboard"
        actions={
          <Stack direction="row" spacing={3} alignItems="center">
            <Icon
              id="dashboard-refresh"
              type="refresh"
              variant="large"
              showbg
            />
            <Icon id="dashboard-heaer" type="settings" variant="large" showbg />
          </Stack>
        }
      />
      {/* <MonthlyTradeStatsChart
        monthlyTradeStats={dashBoardData?.monthlyTradeStats}
      />
      <PeriodStatsDashboard periodStats={dashBoardData?.periodStats} />
      <TradingPerformanceDashboard /> */}
      <DashboardStats />

      <Box display="flex" mt={2} flexDirection="column" gap={2}>
        <ActiveTrades />
        <Box display="flex" gap={2}>
          <Box flex={1}>
            <TradesAndInvestments monthlyTrades={trades} />
          </Box>
          <Box flex={1}>
            <AssetReturnsFunnel />
          </Box>
        </Box>
        <PerformanceOverview />
        <TopGainersLosers />
      </Box>
    </>
  );
};

export default Dashboard;
