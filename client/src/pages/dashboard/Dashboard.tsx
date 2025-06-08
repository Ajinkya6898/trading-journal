import { Box, Stack } from "@mui/material";
import PageHeader from "../../ui-components/PageHeader";
import DashboardStats from "./DashboardStats";
import Icon from "../../ui-components/Icon";
import ActiveTrades from "./ActiveTrades";
import AssetReturnsFunnel from "./AssetReturnsFunnel";
import TradesAndInvestments from "./TradesAndInvestments";
import PerformanceOverview from "./PerformanceOverview";

const Dashboard = () => {
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
      <DashboardStats />
      <Box display="flex" mt={2} flexDirection="column" gap={2}>
        <ActiveTrades />
        <Box display="flex" gap={2}>
          <Box flex={1}>
            <TradesAndInvestments />
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
