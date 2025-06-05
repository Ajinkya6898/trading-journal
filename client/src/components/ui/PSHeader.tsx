"use client";

import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface PSHeaderProps {
  title: string;
  tooltipText?: string;
}

export function PSHeader({ title, tooltipText }: PSHeaderProps) {
  const today = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex items-center justify-between py-4 border-b">
      <h1 className="text-xl font-semibold tracking-tight">{title}</h1>

      <div className="flex items-center space-x-4">
        <Button
          size="sm"
          className="cursor-default flex items-center gap-2"
        >
          <CalendarDays className="w-4 h-4" />
          {today}
        </Button>

        {tooltipText && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Information">
                <Info className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" align="center" className="max-w-xs">
              {tooltipText}
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
  );
}
