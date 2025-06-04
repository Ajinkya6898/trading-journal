import { ActiveTradesTable } from "@/components/dashboard/ActiveTradesTable";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSummary } from "@/components/dashboard/DashboardSummary";
import PortfolioDistribution from "@/components/dashboard/PortfolioDistribution";
import TraderQuotesSlider from "@/components/dashboard/TraderQuotesSlider";
import WinnerLoserPieChart from "@/components/dashboard/WinnerLoserPieChart";

const Dashboard = () => {
  return (
    <>
      <DashboardHeader />
      <DashboardSummary />
      <TraderQuotesSlider />
      <div className="flex gap-6">
        <div className="w-full">
          <ActiveTradesTable />
        </div>
        <div className="w-[30%]">
          <WinnerLoserPieChart />
        </div>
      </div>
      <PortfolioDistribution />
    </>
  );
};

export default Dashboard;
