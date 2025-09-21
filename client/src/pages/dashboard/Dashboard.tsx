import { useEffect } from "react";
import { Box, Grid, Stack } from "@mui/material";
import PageHeader from "../../ui-components/PageHeader";
import DashboardStats from "./DashboardStats";
import Icon from "../../ui-components/Icon";
import ActiveTrades from "./ActiveTrades";
import AssetReturnsFunnel from "./AssetReturnsFunnel";
import TradesAndInvestments from "./TradesAndInvestments";
import PerformanceOverview from "./PerformanceOverview";
import useDashboardStore from "../../store/useDashboardStore";
import Loader from "../../ui-components/Loader";
import AIInsightsPanel from "../ai/AIInsightsPanel";

const Dashboard = () => {
  const { trades, loading, error, fetchDashboardTrades } = useDashboardStore();

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
      </Box>
    </>
  );
};

export default Dashboard;
