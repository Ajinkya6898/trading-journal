import { Button } from "@/components/ui/button";
import { CalendarDays, Check, X } from "lucide-react";
import { useState } from "react";

export function JournalTableHeader() {
  const [onlyPositive, setOnlyPositive] = useState(false);
  const [onlyNegative, setOnlyNegative] = useState(false);

  const togglePositive = () => {
    setOnlyPositive(!onlyPositive);
    if (onlyNegative) setOnlyNegative(false);
  };

  const toggleNegative = () => {
    setOnlyNegative(!onlyNegative);
    if (onlyPositive) setOnlyPositive(false);
  };

  return (
    <div className="flex items-center justify-between py-4 border-b">
      <h2 className="text-xl font-semibold tracking-tight">Trade Journal</h2>

      <div className="flex items-center space-x-3">
        <Button size="sm" variant="outline">
          <CalendarDays className="w-4 h-4 mr-2" />
          Date Range
        </Button>

        <Button
          size="sm"
          variant={onlyPositive ? "default" : "outline"}
          onClick={togglePositive}
          className="flex items-center space-x-1"
        >
          <Check className="w-4 h-4" />
          <span>Only Positive</span>
        </Button>

        <Button
          size="sm"
          variant={onlyNegative ? "default" : "outline"}
          onClick={toggleNegative}
          className="flex items-center space-x-1"
        >
          <X className="w-4 h-4" />
          <span>Only Negative</span>
        </Button>
      </div>
    </div>
  );
}
