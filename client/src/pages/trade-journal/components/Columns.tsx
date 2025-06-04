import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Trade = {
  tradeCount: number;
  entryDate: string;
  exitDate: string;
  daysHeld: number;
  symbol: string;
  qty: number;
  bought: number;
  exit: number;
  pnl: number;
  comm: number;
  realisedPnl: number;
  winPercent: number;
  percentPnl: number;
  rupeesAtWork: number;
};

export const data: Trade[] = [
  {
    tradeCount: 1,
    entryDate: "2024-06-01",
    exitDate: "2024-06-05",
    daysHeld: 4,
    symbol: "TCS",
    qty: 10,
    bought: 3600,
    exit: 3700,
    pnl: 1000,
    comm: 50,
    realisedPnl: 950,
    winPercent: 100,
    percentPnl: 2.78,
    rupeesAtWork: 36000,
  },

  {
    tradeCount: 2,
    entryDate: "2024-06-01",
    exitDate: "2024-06-05",
    daysHeld: 30,
    symbol: "Paytm",
    qty: 200,
    bought: 400,
    exit: 1200,
    pnl: 160000,
    comm: 10000,
    realisedPnl: 160000,
    winPercent: 100,
    percentPnl: 200,
    rupeesAtWork: 36000,
  },
];

export const columns: ColumnDef<Trade>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "tradeCount",
    header: "#",
  },
  {
    accessorKey: "entryDate",
    header: "Entry Date",
  },
  {
    accessorKey: "exitDate",
    header: "Exit Date",
  },
  {
    accessorKey: "daysHeld",
    header: "Days Held",
  },
  {
    accessorKey: "symbol",
    header: "Symbol",
  },
  {
    accessorKey: "qty",
    header: "Qty",
  },
  {
    accessorKey: "bought",
    header: "Bought",
  },
  {
    accessorKey: "exit",
    header: "Exit",
  },
  {
    accessorKey: "pnl",
    header: "P&L",
  },
  {
    accessorKey: "comm",
    header: "Comm",
  },
  {
    accessorKey: "realisedPnl",
    header: "Realised P&L",
  },
  {
    accessorKey: "winPercent",
    header: "% Wins",
  },
  {
    accessorKey: "percentPnl",
    header: "% P&L",
  },
  {
    accessorKey: "rupeesAtWork",
    header: "₹ At Work",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const trade = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(String(trade.tradeCount))
              }
            >
              Copy trade #
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View trade</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
