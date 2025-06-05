"use client";

import { DataTable } from "@/components/ui/DataTable";
import { riskBasedColumns } from "./risk-based-columns";
import { RiskBasedPSResult } from "./risk-based-columns";
interface Props {
  data: RiskBasedPSResult[];
}

export default function RiskBasedPSResultTable({ data }: Props) {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">Calculation Results</h2>
      <DataTable columns={riskBasedColumns} data={data} />
    </div>
  );
}
