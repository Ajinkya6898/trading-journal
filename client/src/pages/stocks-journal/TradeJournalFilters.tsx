import {
  TextField,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
  Paper,
  Typography,
  Box,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { TrendingUp, TrendingDown, ViewList } from "@mui/icons-material";
import { DatePicker } from "../../ui-components/Datepicker";
import { alpha } from "@mui/material/styles";
import DateRangeFilter from "../../ui-components/filters/DateRangeFilter";

type TradeJournalFiltersProps = {
  winLossType: "All" | "Only Winners" | "Only Losers";
  onWinLossTypeChange: (type: "All" | "Only Winners" | "Only Losers") => void;
  tradeType: "Intraday" | "Swing" | "Positional" | "Investment";
  onTradeTypeChange: (
    type: "Intraday" | "Swing" | "Positional" | "Investment"
  ) => void;
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
};

const tradeTypes = ["Intraday", "Swing", "Positional", "Investment"];

const TradeJournalFilters = ({
  winLossType,
  onWinLossTypeChange,
  tradeType,
  onTradeTypeChange,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: TradeJournalFiltersProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const getWinLossIcon = (type: string) => {
    switch (type) {
      case "Only Winners":
        return <TrendingUp fontSize="small" />;
      case "Only Losers":
        return <TrendingDown fontSize="small" />;
      default:
        return <ViewList fontSize="small" />;
    }
  };

  const getWinLossColor = (type: string) => {
    switch (type) {
      case "Only Winners":
        return "success";
      case "Only Losers":
        return "error";
      default:
        return "primary";
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        px: 3,
        py: 4,
        borderRadius: 3,
        background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
        border: "1px solid",
        borderColor: "divider",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: "linear-gradient(90deg, #1976d2, #42a5f5)",
        },
      }}
    >
      <Stack
        direction={isMobile ? "column" : "row"}
        spacing={3}
        alignItems={isMobile ? "stretch" : "flex-start"}
        justifyContent="space-between"
      >
        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={2}
          sx={{ flex: 1 }}
        >
          <Box>
            <ToggleButtonGroup
              value={winLossType}
              exclusive
              onChange={(e, newValue) => {
                if (newValue !== null) onWinLossTypeChange(newValue);
              }}
              size="small"
              sx={{
                "& .MuiToggleButton-root": {
                  px: 2,
                  py: 1,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 500,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: alpha(theme.palette.primary.main, 0.04),
                  },
                  "&.Mui-selected": {
                    color: "white",
                    fontWeight: 600,
                    "&:hover": {
                      opacity: 0.9,
                    },
                  },
                },
                "& .MuiToggleButton-root[value='All'].Mui-selected": {
                  bgcolor: "primary.main",
                  borderColor: "primary.main",
                },
                "& .MuiToggleButton-root[value='Only Winners'].Mui-selected": {
                  bgcolor: "success.main",
                  borderColor: "success.main",
                },
                "& .MuiToggleButton-root[value='Only Losers'].Mui-selected": {
                  bgcolor: "error.main",
                  borderColor: "error.main",
                },
              }}
            >
              <ToggleButton value="All">
                <Stack direction="row" alignItems="center" spacing={1}>
                  {getWinLossIcon("All")}
                  <span>All Trades</span>
                </Stack>
              </ToggleButton>
              <ToggleButton value="Only Winners">
                <Stack direction="row" alignItems="center" spacing={1}>
                  {getWinLossIcon("Only Winners")}
                  <span>Winners</span>
                </Stack>
              </ToggleButton>
              <ToggleButton value="Only Losers">
                <Stack direction="row" alignItems="center" spacing={1}>
                  {getWinLossIcon("Only Losers")}
                  <span>Losers</span>
                </Stack>
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {isMobile && <Divider />}

          <Box sx={{ minWidth: isMobile ? "100%" : 200 }}>
            <TextField
              select
              value={tradeType}
              onChange={(e) => onTradeTypeChange(e.target.value as any)}
              size="small"
              fullWidth={isMobile}
              variant="outlined"
              sx={{
                minWidth: isMobile ? "100%" : 180,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  bgcolor: "background.paper",
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "primary.main",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderWidth: 2,
                  },
                },
                "& .MuiInputLabel-root": {
                  fontWeight: 500,
                },
              }}
            >
              {tradeTypes.map((t) => (
                <MenuItem
                  key={t}
                  value={t}
                  sx={{
                    py: 1.5,
                    "&:hover": {
                      bgcolor: alpha(theme.palette.primary.main, 0.08),
                    },
                  }}
                >
                  <Typography variant="body2" fontWeight={500}>
                    {t}
                  </Typography>
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Stack>

        {isMobile && <Divider />}

        <DateRangeFilter
          fromDate={startDate}
          toDate={endDate}
          onFromDateChange={onStartDateChange}
          onToDateChange={onEndDateChange}
          onApply={() => {}}
        />
      </Stack>
    </Paper>
  );
};

export default TradeJournalFilters;
