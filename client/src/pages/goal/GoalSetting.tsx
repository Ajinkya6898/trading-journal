import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Stack,
  Divider,
  useTheme,
} from "@mui/material";
import {
  Crosshair,
  TrendingUp,
  IndianRupee,
  Wallet,
  CheckCircle,
  XCircle,
  Calendar,
  Clock,
} from "lucide-react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import StatCard from "../../ui-components/StatCard";
import BackgroundContainer from "../../ui-components/BackgroundContainer";
import PageHeader from "../../ui-components/PageHeader";
import axiosInstance from "../../store/axiosInstance";
import Loader from "../../ui-components/Loader";

const GoalSetting = () => {
  const theme = useTheme();

  const [loading, setLoading] = useState(true);
  const [goalActive, setGoalActive] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [goalPercent, setGoalPercent] = useState<any>();
  const [goalAmount, setGoalAmount] = useState<number>(0);
  const [moneyEarned, setMoneyEarned] = useState<number>(0);
  const [monthlyDistribution, setMonthlyDistribution] = useState([]);
  const [returnsEarned, setReturnsEarned] = useState<number>(0);
  const [noGoalMessage, setNoGoalMessage] = useState<string>("");

  const fetchGoalProgress = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/goal/details");
      const data = response.data;

      if (data.goalActive) {
        setGoalActive(true);
        setStartDate(new Date(data.startDate));
        setEndDate(new Date(data.endDate));
        setGoalPercent(data.targetReturnPercent);
        setGoalAmount(data.goalAmount);
        setMoneyEarned(data.moneyEarnedSoFar);
        setReturnsEarned(data.returnsEarnedSoFar);
        setMonthlyDistribution(data.monthlyDistribution);
      } else {
        // No active goal
        setGoalActive(false);
        setNoGoalMessage(data.message || "No active goal found.");
      }
    } catch (error: any) {
      console.error("Error fetching goal progress:", error);
      setGoalActive(false);
      setNoGoalMessage("Error fetching goal progress.");
    } finally {
      setLoading(false);
    }
  };

  const saveGoal = async () => {
    if (!startDate || !endDate || !goalPercent) return;

    try {
      const response = await axiosInstance.post("/goal/create", {
        startDate,
        endDate,
        targetReturnPercent: goalPercent,
      });
      if (response.data) {
        // Refresh progress after creating goal
        fetchGoalProgress();
      }
    } catch (error: any) {
      console.error("Error creating goal:", error);
    }
  };

  useEffect(() => {
    fetchGoalProgress();
  }, []);

  const remainingPercent = goalPercent - returnsEarned;
  const remainingAmount = goalAmount - moneyEarned;

  if (loading) return <Loader />;

  return (
    <Box>
      <Box mb={4}>
        <PageHeader title="Goal Summary" />
        <Divider />
      </Box>

      {!goalActive && (
        <BackgroundContainer
          padding="32px"
          extraStyles={{ marginBottom: "32px" }}
        >
          <>
            <Typography variant="h5" mb={3} color="error.main">
              {noGoalMessage}
            </Typography>

            <Stack direction="row" alignItems="center" spacing={2} mb={3}>
              <Box>
                <Typography variant="h5" color="text.primary">
                  Investment Goal Setup
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Define your investment targets and timeline
                </Typography>
              </Box>
            </Stack>

            <Grid container spacing={3}>
              <Grid>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                />
              </Grid>
              <Grid>
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                />
              </Grid>
              <Grid>
                <TextField
                  fullWidth
                  label="Target Return %"
                  value={goalPercent}
                  onChange={(e) => setGoalPercent(Number(e.target.value))}
                  variant="outlined"
                  type="number"
                  InputProps={{
                    endAdornment: (
                      <Typography color="text.secondary">%</Typography>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            <Box mt={3}>
              <Button variant="contained" size="large" onClick={saveGoal}>
                Save Goal
              </Button>
            </Box>
          </>
        </BackgroundContainer>
      )}

      {goalActive && (
        <>
          <Typography
            variant="h5"
            fontWeight={600}
            mb={2}
            color="background.default"
          >
            Overall Goal Summary -
          </Typography>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "16px",
              marginBottom: "24px",
            }}
          >
            <StatCard
              title="Start Date"
              value={startDate?.toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
              icon={<Calendar />}
              color={theme.palette.primary.main}
              chipLabel="Starting Date"
            />

            <StatCard
              title="End Date"
              value={endDate?.toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
              icon={<Clock />}
              color={theme.palette.error.medium}
              chipLabel="Ending Date"
            />

            <StatCard
              title="Goal %"
              value={`${goalPercent} %`}
              icon={<TrendingUp />}
              color={theme.palette.success.medium}
              chipLabel="Target Percentage"
            />

            <StatCard
              title="Target Amount"
              value={`₹ ${goalAmount?.toLocaleString()}`}
              icon={<IndianRupee />}
              color={theme.palette.primary.main}
              chipLabel="Target Amount"
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "24px",
              marginBottom: "24px",
            }}
          >
            <StatCard
              title="Money Earned So Far"
              value={`₹ ${moneyEarned?.toLocaleString()}`}
              chipLabel="Positive"
              icon={<Wallet />}
              color={theme.palette.success.medium}
            />
            <StatCard
              title="Returns Earned So Far"
              value={`${returnsEarned}%`}
              chipLabel="Growth"
              icon={<TrendingUp />}
              color={theme.palette.info.main}
            />
            <StatCard
              title="Returns Still Needed"
              value={`${
                remainingPercent > 0 ? remainingPercent.toFixed(1) : 0
              }%`}
              chipLabel="Target"
              icon={<Crosshair />}
              color={theme.palette.warning.light}
            />
            <StatCard
              title="Money Still Needed"
              value={`₹ ${
                remainingAmount > 0 ? remainingAmount?.toLocaleString() : 0
              }`}
              chipLabel={remainingAmount > 0 ? "Remaining" : "Achieved"}
              icon={<IndianRupee />}
              color={
                remainingAmount > 0
                  ? theme.palette.error.medium
                  : theme.palette.success.medium
              }
            />
          </div>

          <Typography
            variant="h5"
            fontWeight={600}
            mb={2}
            color="background.default"
          >
            Monthly Goal Summary -
          </Typography>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "24px",
              marginBottom: "24px",
            }}
          >
            {monthlyDistribution.map((month: any, index: number) => {
              if (month.status === "Pending") return null;

              return (
                <div key={index}>
                  <StatCard
                    title={month.month}
                    value={`${month.targetPercent}%`}
                    extraInfo={`Target Amount: ₹ ${month.targetAmount.toLocaleString()}`}
                    chipLabel={
                      month.status === "Achieved"
                        ? `Achieved: ₹ ${month.earned.toLocaleString()}`
                        : `Missed: ₹ ${month.earned.toLocaleString()}`
                    }
                    icon={
                      month.status === "Achieved" ? (
                        <CheckCircle />
                      ) : (
                        <XCircle />
                      )
                    }
                    color={
                      month.status === "Achieved"
                        ? theme.palette.success.medium
                        : theme.palette.error.medium
                    }
                  />
                </div>
              );
            })}
          </div>
        </>
      )}
    </Box>
  );
};

export default GoalSetting;
