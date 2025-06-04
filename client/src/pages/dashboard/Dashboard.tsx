import { ActiveTradesTable } from "@/pages/dashboard/components/ActiveTradesTable";
import { DashboardHeader } from "@/pages/dashboard/components/DashboardHeader";
import { DashboardSummary } from "@/pages/dashboard/components/DashboardSummary";
import PortfolioDistribution from "@/pages/dashboard/components/PortfolioDistribution";
import TopPerformers from "@/pages/dashboard/components/TopPerformers";
import TraderQuotesSlider from "@/pages/dashboard/components/TraderQuotesSlider";
import WinnerLoserPieChart from "@/pages/dashboard/components/WinnerLoserPieChart";

const Dashboard = () => {
  return (
    <>
      <DashboardHeader />
      <DashboardSummary />
      <PortfolioDistribution />
      <TraderQuotesSlider />
      <div className="flex gap-6">
        <div className="w-full">
          <ActiveTradesTable />
        </div>
        <div className="w-[30%] space-y-6">
          {/* <WinnerLoserPieChart /> */}
          <TopPerformers />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
