import { Button } from "@/components/ui/button";
import { CalendarDays, RefreshCw, Settings } from "lucide-react";

export function DashboardHeader() {
  const today = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex items-center justify-between py-4 border-b">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
      </div>

      <div className="flex items-center space-x-4">
        <Button size="sm">
          <CalendarDays className="w-4 h-4 mr-2" />
          {today}
        </Button>
        <Button variant="outline" size="icon">
          <RefreshCw className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Settings className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
