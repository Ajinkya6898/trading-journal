import { PSHeader } from "@/components/ui/PSHeader";
import { RiskBasedPSForm } from "./components/RiskBasedPSForm";
import RiskBasedPSResultTable from "./components/RiskBasedPSResultTable";

const resultsArray = [
  {
    capital: 500000,
    riskPercent: 1,
    entry: 250,
    stopLoss: 240,
    riskAmount: 5000,
    positionSize: 500,
  },
  {
    capital: 1000000,
    riskPercent: 2,
    entry: 1500,
    stopLoss: 1400,
    riskAmount: 20000,
    positionSize: 200,
  },
  {
    capital: 250000,
    riskPercent: 1.5,
    entry: 600,
    stopLoss: 580,
    riskAmount: 3750,
    positionSize: 187.5,
  },
];

const RiskBasedPositionSize = () => {
  return (
    <>
      <PSHeader
        title="Risk Based Position Size"
        tooltipText="Position sizing helps manage risk by calculating trade size based on your risk tolerance and stop loss."
      />
      <RiskBasedPSForm onCalculate={() => console.log("!")} />;
      <RiskBasedPSResultTable data={resultsArray} />
    </>
  );
};

export default RiskBasedPositionSize;
