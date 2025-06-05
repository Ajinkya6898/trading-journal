import { ColumnDef } from "@tanstack/react-table";

export type RiskBasedPSResult = {
  capital: number;
  riskPercent: number;
  entry: number;
  stopLoss: number;
  riskAmount: number;
  positionSize: number;
};

export const riskBasedColumns: ColumnDef<RiskBasedPSResult>[] = [
  {
    accessorKey: "capital",
    header: "Capital",
    cell: ({ getValue }) => `₹${getValue<number>().toLocaleString()}`,
  },
  {
    accessorKey: "riskPercent",
    header: "Risk (%)",
    cell: ({ getValue }) => `${getValue<number>()}%`,
  },
  {
    accessorKey: "entry",
    header: "Entry Price",
    cell: ({ getValue }) => `₹${getValue<number>()}`,
  },
  {
    accessorKey: "stopLoss",
    header: "Stop Loss",
    cell: ({ getValue }) => `₹${getValue<number>()}`,
  },
  {
    accessorKey: "riskAmount",
    header: "Risk Amount",
    cell: ({ getValue }) => `₹${getValue<number>().toFixed(2)}`,
  },
  {
    accessorKey: "positionSize",
    header: "Position Size",
    cell: ({ getValue }) => getValue<number>().toFixed(2),
  },
];
