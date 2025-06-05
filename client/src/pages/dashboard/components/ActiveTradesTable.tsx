"use client";

import * as React from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
} from "@tanstack/react-table";
import { ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// 🔹— type trimmed for active/open trades —🔹
type ActiveTrade = {
  tradeCount: number;
  entryDate: string;
  daysHeld: number;
  symbol: string;
  qty: number;
  bought: number;
  pnl: number; // ↳ unrealised
  percentPnl: number; // ↳ %
  rupeesAtWork: number;
};

const dummyActiveTrades: ActiveTrade[] = [
  {
    tradeCount: 8,
    entryDate: "2025-06-02",
    daysHeld: 2,
    symbol: "INFY",
    qty: 20,
    bought: 1460,
    pnl: 720,
    percentPnl: 2.47,
    rupeesAtWork: 29_200,
  },
  {
    tradeCount: 9,
    entryDate: "2025-05-30",
    daysHeld: 5,
    symbol: "HDFCBANK",
    qty: 15,
    bought: 1600,
    pnl: 525,
    percentPnl: 2.19,
    rupeesAtWork: 24_000,
  },
  {
    tradeCount: 8,
    entryDate: "2025-06-02",
    daysHeld: 2,
    symbol: "INFY",
    qty: 20,
    bought: 1460,
    pnl: 720,
    percentPnl: 2.47,
    rupeesAtWork: 29_200,
  },
  {
    tradeCount: 8,
    entryDate: "2025-06-02",
    daysHeld: 2,
    symbol: "INFY",
    qty: 20,
    bought: 1460,
    pnl: 720,
    percentPnl: 2.47,
    rupeesAtWork: 29_200,
  },

  {
    tradeCount: 8,
    entryDate: "2025-06-02",
    daysHeld: 2,
    symbol: "INFY",
    qty: 20,
    bought: 1460,
    pnl: 720,
    percentPnl: 2.47,
    rupeesAtWork: 29_200,
  },
  {
    tradeCount: 8,
    entryDate: "2025-06-02",
    daysHeld: 2,
    symbol: "INFY",
    qty: 20,
    bought: 1460,
    pnl: 720,
    percentPnl: 2.47,
    rupeesAtWork: 29_200,
  },

  {
    tradeCount: 8,
    entryDate: "2025-06-02",
    daysHeld: 2,
    symbol: "INFY",
    qty: 20,
    bought: 1460,
    pnl: 720,
    percentPnl: 2.47,
    rupeesAtWork: 29_200,
  },
  {
    tradeCount: 8,
    entryDate: "2025-06-02",
    daysHeld: 2,
    symbol: "INFY",
    qty: 20,
    bought: 1460,
    pnl: 720,
    percentPnl: 2.47,
    rupeesAtWork: 29_200,
  },
  {
    tradeCount: 8,
    entryDate: "2025-06-02",
    daysHeld: 2,
    symbol: "INFY",
    qty: 20,
    bought: 1460,
    pnl: 720,
    percentPnl: 2.47,
    rupeesAtWork: 29_200,
  },

  {
    tradeCount: 8,
    entryDate: "2025-06-02",
    daysHeld: 2,
    symbol: "INFY",
    qty: 20,
    bought: 1460,
    pnl: 720,
    percentPnl: 2.47,
    rupeesAtWork: 29_200,
  },
  {
    tradeCount: 8,
    entryDate: "2025-06-02",
    daysHeld: 2,
    symbol: "INFY",
    qty: 20,
    bought: 1460,
    pnl: 720,
    percentPnl: 2.47,
    rupeesAtWork: 29_200,
  },

  {
    tradeCount: 8,
    entryDate: "2025-06-02",
    daysHeld: 2,
    symbol: "INFY",
    qty: 20,
    bought: 1460,
    pnl: 720,
    percentPnl: 2.47,
    rupeesAtWork: 29_200,
  },
];

/* -------------------------------------------------- */
/* TABLE COLUMN DEFINITIONS                           */
/* -------------------------------------------------- */
export const activeColumns: ColumnDef<ActiveTrade>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(v) => row.toggleSelected(!!v)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  { accessorKey: "tradeCount", header: "#" },
  { accessorKey: "entryDate", header: "Entry Date" },
  { accessorKey: "daysHeld", header: "Days Held" },
  { accessorKey: "symbol", header: "Symbol" },
  { accessorKey: "qty", header: "Qty" },
  { accessorKey: "bought", header: "Bought" },
  { accessorKey: "pnl", header: "P&L" },
  { accessorKey: "percentPnl", header: "% P&L" },
  { accessorKey: "rupeesAtWork", header: "₹ At Work" },
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

/* -------------------------------------------------- */
/* MAIN COMPONENT                                     */
/* -------------------------------------------------- */
export function ActiveTradesTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [filters, setFilters] = React.useState<ColumnFiltersState>([]);
  const [visibility, setVisibility] = React.useState<VisibilityState>({});
  const [selection, setSelection] = React.useState({});

  const table = useReactTable({
    data: dummyActiveTrades,
    columns: activeColumns,
    state: {
      sorting,
      columnFilters: filters,
      columnVisibility: visibility,
      rowSelection: selection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setFilters,
    onColumnVisibilityChange: setVisibility,
    onRowSelectionChange: setSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="w-full">
      <div className="flex items-center pb-4">
        <h2 className="text-xl font-semibold">Active Trades #</h2>
        <Input
          placeholder="Filter stocks..."
          value={(table.getColumn("symbol")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("symbol")?.setFilterValue(e.target.value)
          }
          className="max-w-sm ml-[auto]"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((c) => c.getCanHide())
              .map((c) => (
                <DropdownMenuCheckboxItem
                  key={c.id}
                  checked={c.getIsVisible()}
                  onCheckedChange={(v) => c.toggleVisibility(!!v)}
                  className="capitalize"
                >
                  {c.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* ---------- table ---------- */}
      <div className="rounded-md border mt-2 px-4 py-2">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((h) => (
                  <TableHead className="px-2" key={h.id}>
                    {h.isPlaceholder
                      ? null
                      : flexRender(h.column.columnDef.header, h.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={activeColumns.length}
                  className="h-24 text-center"
                >
                  No active trades.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* pagination & selection info */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} selected
        </div>

        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
