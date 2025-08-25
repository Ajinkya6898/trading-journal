import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";

const assetData = [
  {
    asset: "Stock Market",
    return: 100,
    lost: 10.2,
    change: 6.01,
    color: "#AED6F1",
  },
  {
    asset: "Mutual Fund",
    return: 82,
    lost: 15.3,
    change: 4.12,
    color: "#5DADE2",
  },
  { asset: "ETF", return: 64, lost: 12.7, change: -3.91, color: "#3498DB" },
  { asset: "Crypto", return: 41, lost: 32.2, change: 0.01, color: "#27AE60" },
];

const getColor = (value: number) => {
  if (value > 0) return "success";
  if (value < 0) return "error";
  return "warning";
};

const AssetReturnsFunnel = () => {
  return (
    <Box p={3} sx={{ backgroundColor: "white", borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h6" gutterBottom>
        Asset Returns Funnel
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        Performance comparison in the last 1 month
      </Typography>

      <Box mt={2} mb={4}>
        {assetData.map((item) => (
          <Box key={item.asset} display="flex" alignItems="center" mb={2}>
            <Typography
              variant="body2"
              sx={{ minWidth: "120px", mr: 2, fontWeight: 500 }}
            >
              {item.asset}
            </Typography>

            <Box
              sx={{
                position: "relative",
                backgroundColor: "#e0e0e0",
                height: 24,
                borderRadius: "6px",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  height: "100%",
                  width: `${item.return}%`,
                  backgroundColor: item.color,
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  pl: 1,
                  color: "#000",
                  fontWeight: 500,
                }}
              >
                <Typography variant="subtitle1">{item.return}%</Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead sx={{ backgroundColor: "#f9fafb" }}>
            <TableRow>
              <TableCell>Asset</TableCell>
              <TableCell>Loss %</TableCell>
              <TableCell>This Month</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assetData.map((row) => (
              <TableRow key={row.asset}>
                <TableCell>{row.asset}</TableCell>
                <TableCell>{row.lost}%</TableCell>
                <TableCell>
                  <Chip
                    label={`${row.change > 0 ? "+" : ""}${row.change}%`}
                    size="small"
                    color={getColor(row.change)}
                    variant="outlined"
                    sx={{
                      fontWeight: 500,
                      minWidth: "60px",
                      justifyContent: "center",
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AssetReturnsFunnel;
