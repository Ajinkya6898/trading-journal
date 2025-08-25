import React, { useState, useMemo } from "react";
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
  CircularProgress,
  Button,
  Divider,
} from "@mui/material";

type ReusableTableProps<T> = {
  columns: any;
  data: T[];
  rowKey?: any;
  showCheckbox?: boolean;
  onSelectRow?: (id: T[keyof T]) => void;
  selectedRows?: Array<T[keyof T]>;
  onRowClick?: (row: T) => void;
  tableHeader?: string;
  loading?: boolean;
  // Pagination props
  showPagination?: boolean;
  itemsPerPageOptions?: number[];
  showExpandCollapse?: boolean;
  onExpandAll?: (expand: boolean) => void;
  isExpandAllDisabled?: boolean;
  isCollapseAllDisabled?: boolean;
  paginationId?: string;
  // Analytics tracking (optional)
  trackGenericEvent?: (constant: any, value: string) => void;
  navigationConstant?: any;
  paginationConstant?: any;
};

// Pagination Component
interface PaginationProps {
  currentPage: number;
  total: number;
  setCurrentPage: (page: number) => void;
  count: number;
  paginationConstant?: any;
  trackGenericEvent?: (constant: any, value: string) => void;
}

function Pagination({
  currentPage,
  total,
  setCurrentPage,
  count,
  paginationConstant,
  trackGenericEvent,
}: PaginationProps) {
  const theme = useTheme();
  const totalPages = Math.ceil(total / count) || 1;

  const handlePageChange = (page: number) => {
    if (trackGenericEvent) {
      trackGenericEvent(paginationConstant, page.toString());
    }
    setCurrentPage(page);
  };

  const handleFirstPageClick = () => {
    handlePageChange(1);
    if (trackGenericEvent) {
      trackGenericEvent(paginationConstant, "First");
    }
  };

  const handlePreviousPageClick = () => {
    if (trackGenericEvent) {
      trackGenericEvent(paginationConstant, "Previous");
    }
    handlePageChange(Math.max(1, currentPage - 1));
  };

  const handleNextPageClick = () => {
    if (trackGenericEvent) {
      trackGenericEvent(paginationConstant, "Next");
    }
    handlePageChange(Math.min(totalPages, currentPage + 1));
  };

  const handleLastPageClick = () => {
    if (trackGenericEvent) {
      trackGenericEvent(paginationConstant, "Last");
    }
    handlePageChange(totalPages);
  };

  // Calculate page range
  const getPageRange = () => {
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);

    if (totalPages <= 5) {
      start = 1;
      end = totalPages;
    } else if (currentPage <= 2) {
      end = Math.min(5, totalPages);
    } else if (currentPage >= totalPages - 1) {
      start = Math.max(1, totalPages - 4);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const pageRange = getPageRange();

  const paginationButtonStyles = {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    border: `1px solid ${alpha(theme.palette.grey[300], 0.5)}`,
    fontWeight: "bold",
    margin: 0,
    minWidth: "40px",
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, 0.2),
      border: `1px solid ${alpha(theme.palette.grey[400], 0.8)}`,
    },
  };

  return (
    <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <Button
        variant="outlined"
        disabled={currentPage === 1}
        onClick={handleFirstPageClick}
        size="small"
        sx={{ minWidth: "60px" }}
      >
        First
      </Button>
      <Button
        variant="outlined"
        disabled={currentPage === 1}
        onClick={handlePreviousPageClick}
        size="small"
        sx={{ minWidth: "80px" }}
      >
        Previous
      </Button>
      {pageRange.map((page) => (
        <Button
          variant="outlined"
          key={page}
          onClick={() => handlePageChange(page)}
          size="small"
          sx={
            currentPage === page ? paginationButtonStyles : { minWidth: "40px" }
          }
        >
          {page}
        </Button>
      ))}
      <Button
        variant="outlined"
        disabled={currentPage === totalPages}
        onClick={handleNextPageClick}
        size="small"
        sx={{ minWidth: "60px" }}
      >
        Next
      </Button>
      <Button
        variant="outlined"
        disabled={currentPage === totalPages}
        onClick={handleLastPageClick}
        size="small"
        sx={{ minWidth: "60px" }}
      >
        Last
      </Button>
    </Box>
  );
}

// Page Count Change Component
interface PageCountChangeProps {
  setPageCount: (page: number) => void;
  count: number;
  countPerPageOptions: number[];
  navigationConstant?: any;
  trackGenericEvent?: (navigationConstant: any, value: string) => void;
  id: string;
}

function PageCountChange({
  setPageCount,
  count,
  countPerPageOptions,
  navigationConstant,
  trackGenericEvent,
  id,
}: PageCountChangeProps) {
  const theme = useTheme();

  const handlePageChange = (page: number) => {
    if (trackGenericEvent) {
      trackGenericEvent(navigationConstant, page.toString());
    }
    setPageCount(page);
  };

  const paginationButtonStyles = {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    border: `1px solid ${alpha(theme.palette.grey[300], 0.5)}`,
    fontWeight: "bold",
    margin: 0,
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, 0.2),
      border: `1px solid ${alpha(theme.palette.grey[400], 0.8)}`,
    },
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Typography
        variant="body2"
        sx={{ color: theme.palette.text.secondary, fontWeight: 500 }}
      >
        Show
      </Typography>
      <Box sx={{ display: "flex", gap: "4px" }}>
        {countPerPageOptions.map((page) => (
          <Button
            variant="outlined"
            key={page}
            id={`${id}-page-count-id-${page}`}
            onClick={() => handlePageChange(page)}
            size="small"
            sx={count === page ? paginationButtonStyles : { minWidth: "40px" }}
          >
            {page}
          </Button>
        ))}
      </Box>
    </Box>
  );
}

// Pagination Toolbar Component
interface PaginationToolBarProps {
  currentPage: number;
  total: number;
  setCurrentPage: (page: number) => void;
  count: number;
  setPageCount: (count: number) => void;
  setExpandAll?: (flag: boolean) => void;
  countPerPageOptions: number[];
  id: string;
  showExpandAndCollapse?: boolean;
  navigationConstant?: any;
  paginationConstant?: any;
  trackGenericEvent?: (constant: any, value: string) => void;
  isExpandAllDisabled?: boolean;
  isCollapseAllDisabled?: boolean;
}

function PaginationToolBar({
  navigationConstant,
  paginationConstant,
  setPageCount,
  count,
  setCurrentPage,
  total,
  currentPage,
  setExpandAll,
  countPerPageOptions,
  id,
  showExpandAndCollapse = false,
  trackGenericEvent,
  isExpandAllDisabled = false,
  isCollapseAllDisabled = false,
}: PaginationToolBarProps) {
  const theme = useTheme();

  const disabledExpandCollapseStyle = {
    "&.Mui-disabled": {
      opacity: 0.35,
      color: theme.palette.primary.dark,
    },
  };

  const dividerStyle = {
    height: "26px",
    width: "1px",
    border: "0",
    borderRight: "1px solid",
    borderColor: alpha(theme.palette.grey[300], 0.8),
  };

  return (
    <Box
      data-testid={id}
      sx={{
        display: "flex",
        bgcolor: "white",
        p: 2,
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: `0 2px 8px ${alpha(theme.palette.grey[500], 0.1)}`,
        borderRadius: 2,
        border: `1px solid ${alpha(theme.palette.grey[300], 0.3)}`,
      }}
    >
      {showExpandAndCollapse && setExpandAll && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button
            variant="outlined"
            sx={disabledExpandCollapseStyle}
            onClick={() => setExpandAll(true)}
            disabled={isExpandAllDisabled}
            id={`expand-all-${id}`}
            size="small"
          >
            Expand All
          </Button>
          <Divider orientation="vertical" sx={dividerStyle} />
          <Button
            variant="outlined"
            sx={disabledExpandCollapseStyle}
            onClick={() => setExpandAll(false)}
            disabled={isCollapseAllDisabled}
            id={`collapse-all-${id}`}
            size="small"
          >
            Collapse All
          </Button>
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginLeft: showExpandAndCollapse ? "auto" : 0,
          gap: 2,
        }}
      >
        <PageCountChange
          setPageCount={setPageCount}
          count={count}
          countPerPageOptions={countPerPageOptions}
          navigationConstant={navigationConstant}
          trackGenericEvent={trackGenericEvent}
          id={id}
        />

        <Divider orientation="vertical" sx={dividerStyle} />

        <Pagination
          currentPage={currentPage}
          total={total}
          setCurrentPage={setCurrentPage}
          count={count}
          paginationConstant={paginationConstant}
          trackGenericEvent={trackGenericEvent}
        />
      </Box>
    </Box>
  );
}

// Main ReusableTable Component
function ReusableTable<T extends { [key: string]: any }>({
  columns,
  data,
  rowKey = "id",
  showCheckbox = false,
  onSelectRow,
  selectedRows = [],
  onRowClick,
  tableHeader,
  loading = false,
  showPagination = false,
  itemsPerPageOptions = [10, 25, 50, 100],
  showExpandCollapse = false,
  onExpandAll,
  isExpandAllDisabled = false,
  isCollapseAllDisabled = false,
  paginationId = "table-pagination",
  trackGenericEvent,
  navigationConstant,
  paginationConstant,
}: ReusableTableProps<T>) {
  const theme = useTheme();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);

  // Calculate paginated data
  const paginatedData = useMemo(() => {
    if (!showPagination) return data;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, itemsPerPage, showPagination]);

  // Reset to first page when data changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const handleSetPageCount = (count: number) => {
    setItemsPerPage(count);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleExpandAll = (expand: boolean) => {
    if (onExpandAll) {
      onExpandAll(expand);
    }
  };

  return (
    <Box sx={{ width: "100%", mb: 3 }}>
      {tableHeader && (
        <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: theme.palette.text.primary,
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
                  sx={{ borderBottom: "none", pl: 3 }}
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
              {columns.map((col: any) => (
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

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (showCheckbox ? 1 : 0)}
                  sx={{ textAlign: "center", py: 4 }}
                >
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : paginatedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (showCheckbox ? 1 : 0)}
                  sx={{ textAlign: "center", py: 4 }}
                >
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                    No data available
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    There are no records to display
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row, rowIndex) => {
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
                        backgroundColor: alpha(
                          theme.palette.primary.main,
                          0.08
                        ),
                        transform: "scale(1.002)",
                        boxShadow: `inset 4px 0 0 ${theme.palette.primary.main}`,
                      }),
                      "&:hover": {
                        backgroundColor: alpha(
                          theme.palette.primary.main,
                          0.04
                        ),
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
                    {columns.map((col: any) => (
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
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Toolbar */}
      {showPagination && !loading && data.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <PaginationToolBar
            currentPage={currentPage}
            total={data.length}
            setCurrentPage={setCurrentPage}
            count={itemsPerPage}
            setPageCount={handleSetPageCount}
            setExpandAll={showExpandCollapse ? handleExpandAll : undefined}
            countPerPageOptions={itemsPerPageOptions}
            id={paginationId}
            showExpandAndCollapse={showExpandCollapse}
            navigationConstant={navigationConstant}
            paginationConstant={paginationConstant}
            trackGenericEvent={trackGenericEvent}
            isExpandAllDisabled={isExpandAllDisabled}
            isCollapseAllDisabled={isCollapseAllDisabled}
          />
        </Box>
      )}
    </Box>
  );
}

export default ReusableTable;
