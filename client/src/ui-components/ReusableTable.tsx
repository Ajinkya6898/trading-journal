import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  TableContainer,
  Paper,
  Typography,
} from "@mui/material";

type Column<T> = {
  id: keyof T;
  label: string;
  render?: (value: any, row: T, rowIndex: number) => React.ReactNode;
};

type ReusableTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  rowKey?: keyof T;
  showCheckbox?: boolean;
  onSelectRow?: (id: T[keyof T]) => void;
  selectedRows?: Array<T[keyof T]>;
  onRowClick?: (row: T) => void;
  tableHeader?: string;
};

function ReusableTable<T extends { [key: string]: any }>({
  columns,
  data,
  rowKey = "id",
  showCheckbox = false,
  onSelectRow,
  selectedRows = [],
  onRowClick,
  tableHeader,
}: ReusableTableProps<T>) {
  return (
    <>
      <Typography variant="h6" color="textSecondary">
        {tableHeader}
      </Typography>
      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead sx={{ backgroundColor: "gray.lightest" }}>
            <TableRow>
              {showCheckbox && <TableCell padding="checkbox"></TableCell>}
              {columns.map((col) => (
                <TableCell
                  key={String(col.id)}
                  sx={{
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    color: "#374151",
                    textTransform: "capitalize",
                    textAlign: "center",
                  }}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row, rowIndex) => {
              const key = row[rowKey];
              return (
                <TableRow
                  key={String(key ?? rowIndex)}
                  hover
                  onClick={() => onRowClick?.(row)}
                  sx={{
                    cursor: onRowClick ? "pointer" : "default",
                  }}
                >
                  {showCheckbox && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedRows.includes(key)}
                        onChange={() => onSelectRow?.(key)}
                      />
                    </TableCell>
                  )}
                  {columns.map((col) => (
                    <TableCell
                      sx={{ textAlign: "center" }}
                      key={String(col.id)}
                    >
                      {col.render
                        ? col.render(row[col.id], row, rowIndex)
                        : row[col.id]}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ReusableTable;
