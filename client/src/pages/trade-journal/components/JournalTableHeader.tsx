import { Button } from "@/components/ui/button";
import { CalendarDays, Check, X } from "lucide-react";
import { useState } from "react";

export function JournalTableHeader() {
  const [winners, setWinners] = useState(false);
  const [lossers, setLossers] = useState(false);

  const togglePositive = () => {
    setWinners(!winners);
    if (lossers) setLossers(false);
  };

  const toggleNegative = () => {
    setLossers(!lossers);
    if (winners) setWinners(false);
  };

  return (
    <div className="flex items-center justify-between py-4 border-b">
      <h2 className="text-xl font-semibold tracking-tight">Trade Journal</h2>

      <div className="flex items-center space-x-3">
        <Button variant="outline">
          <CalendarDays className="w-4 h-4 mr-2" />
          Date Range
        </Button>

        <Button
          variant={winners ? "default" : "outline"}
          onClick={togglePositive}
          className="flex items-center space-x-1"
        >
          <Check className="w-4 h-4" />
          <span>Winners</span>
        </Button>

        <Button
          variant={lossers ? "default" : "outline"}
          onClick={toggleNegative}
          className="flex items-center space-x-1"
        >
          <X className="w-4 h-4" />
          <span>Lossers</span>
        </Button>
      </div>
    </div>
  );
}
