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
  Box,
  Chip,
  useTheme,
  alpha,
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
  const theme = useTheme();

  return (
    <Box sx={{ width: "100%", mb: 3 }}>
      {/* Enhanced Header Section */}
      {tableHeader && (
        <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.025em",
            }}
          >
            {tableHeader}
          </Typography>
          {showCheckbox && selectedRows.length > 0 && (
            <Chip
              label={`${selectedRows.length} selected`}
              color="primary"
              size="small"
              sx={{
                fontWeight: 600,
                borderRadius: 2,
              }}
            />
          )}
        </Box>
      )}

      {/* Enhanced Table Container */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          borderRadius: 3,
          border: `1px solid ${alpha(theme.palette.grey[300], 0.5)}`,
          overflow: "hidden",
          boxShadow: `0 4px 20px ${alpha(theme.palette.grey[500], 0.1)}`,
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: `0 8px 25px ${alpha(theme.palette.grey[500], 0.15)}`,
          },
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          {/* Enhanced Table Header */}
          <TableHead>
            <TableRow
              sx={{
                background: `linear-gradient(135deg, ${alpha(
                  theme.palette.primary.main,
                  0.08
                )} 0%, ${alpha(theme.palette.secondary.main, 0.08)} 100%)`,
                borderBottom: `2px solid ${alpha(
                  theme.palette.primary.main,
                  0.1
                )}`,
              }}
            >
              {showCheckbox && (
                <TableCell
                  padding="checkbox"
                  sx={{
                    borderBottom: "none",
                    pl: 3,
                  }}
                >
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      background: alpha(theme.palette.primary.main, 0.1),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  />
                </TableCell>
              )}
              {columns.map((col) => (
                <TableCell
                  key={String(col.id)}
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    color: theme.palette.text.primary,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    textAlign: "center",
                    borderBottom: "none",
                    py: 2.5,
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "60%",
                      height: 2,
                      background: `linear-gradient(90deg, transparent, ${alpha(
                        theme.palette.primary.main,
                        0.3
                      )}, transparent)`,
                      borderRadius: 1,
                    },
                  }}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Enhanced Table Body */}
          <TableBody>
            {data.map((row, rowIndex) => {
              const key = row[rowKey];
              const isSelected = selectedRows.includes(key);
              const isEven = rowIndex % 2 === 0;

              return (
                <TableRow
                  key={String(key ?? rowIndex)}
                  hover
                  onClick={() => onRowClick?.(row)}
                  sx={{
                    cursor: onRowClick ? "pointer" : "default",
                    backgroundColor: isEven
                      ? alpha(theme.palette.grey[50], 0.5)
                      : "transparent",
                    transition: "all 0.2s ease",
                    position: "relative",
                    ...(isSelected && {
                      backgroundColor: alpha(theme.palette.primary.main, 0.08),
                      transform: "scale(1.002)",
                      boxShadow: `inset 4px 0 0 ${theme.palette.primary.main}`,
                    }),
                    "&:hover": {
                      backgroundColor: alpha(theme.palette.primary.main, 0.04),
                      transform: "translateY(-1px)",
                      boxShadow: `0 4px 12px ${alpha(
                        theme.palette.grey[400],
                        0.15
                      )}`,
                    },
                    "&:last-child td": {
                      borderBottom: 0,
                    },
                  }}
                >
                  {showCheckbox && (
                    <TableCell
                      padding="checkbox"
                      sx={{
                        pl: 3,
                        borderBottom: `1px solid ${alpha(
                          theme.palette.grey[200],
                          0.8
                        )}`,
                      }}
                    >
                      <Checkbox
                        checked={isSelected}
                        onChange={() => onSelectRow?.(key)}
                        sx={{
                          color: alpha(theme.palette.primary.main, 0.6),
                          "&.Mui-checked": {
                            color: theme.palette.primary.main,
                          },
                          "&:hover": {
                            backgroundColor: alpha(
                              theme.palette.primary.main,
                              0.08
                            ),
                          },
                        }}
                      />
                    </TableCell>
                  )}
                  {columns.map((col) => (
                    <TableCell
                      key={String(col.id)}
                      sx={{
                        textAlign: "center",
                        fontSize: "0.875rem",
                        color: theme.palette.text.secondary,
                        fontWeight: 500,
                        py: 2,
                        borderBottom: `1px solid ${alpha(
                          theme.palette.grey[200],
                          0.8
                        )}`,
                        position: "relative",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          minHeight: 24,
                        }}
                      >
                        {col.render
                          ? col.render(row[col.id], row, rowIndex)
                          : row[col.id]}
                      </Box>
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {/* Empty State */}
        {data.length === 0 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              py: 8,
              color: theme.palette.text.secondary,
            }}
          >
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
              No data available
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              There are no records to display
            </Typography>
          </Box>
        )}
      </TableContainer>
    </Box>
  );
}

export default ReusableTable;
