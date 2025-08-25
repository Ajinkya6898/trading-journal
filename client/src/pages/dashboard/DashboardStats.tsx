import { Card, CardContent, Typography, Box } from "@mui/material";

import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";

import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import CompareArrowsOutlinedIcon from "@mui/icons-material/CompareArrowsOutlined";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import useDashboardStore from "../../store/useDashboardStore";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const DashboardStats = () => {
  const equityCurveData = {
    labels: [
      "Day 1",
      "Day 2",
      "Day 3",
      "Day 4",
      "Day 5",
      "Day 6",
      "Day 7",
      "Day 8",
      "Day 9",
      "Day 10",
    ],
    datasets: [
      {
        label: "Equity Curve",
        data: [
          100000, 101500, 101200, 102000, 103800, 104200, 105500, 106000,
          106800, 107300,
        ],
        fill: true,
        borderColor: "#0070f3",
        backgroundColor: "rgba(0,112,243,0.1)",
        tension: 0.3,
      },
    ],
  };

  const { dashBoardData } = useDashboardStore();
  console.log("dashBoardData", dashBoardData.portfolioOverview);

  return (
    <>
      <Box display="flex" height={"auto"}>
        <Box
          sx={{
            width: "50%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            // gap: 2,
          }}
        >
          {[
            {
              label: "Total Investment",
              value: `₹ ${dashBoardData?.portfolioOverview?.totalInvested}`,
              icon: <AccountBalanceOutlinedIcon color="primary" />,
              bg: "rgba(25, 118, 210, 0.1)",
              description: "Total amount allocated across all assets.",
            },
            {
              label: "Total Returns",
              value: "₹ 3,671,211",
              icon: <ShowChartOutlinedIcon color="warning" />,
              bg: "rgba(255, 193, 7, 0.1)",
              description: "Profit generated across investments so far.",
            },
            {
              label: "Win Percentage",
              value: "64.25%",
              icon: <EmojiEventsOutlinedIcon color="success" />,
              bg: "rgba(76, 175, 80, 0.1)",
              description: "Percentage of trades ending in profit.",
            },
            {
              label: "Total Trades",
              value: "470",
              icon: <CompareArrowsOutlinedIcon color="info" />,
              bg: "rgba(3, 169, 244, 0.1)",
              description: "Total number of completed trade entries.",
            },
          ].map((item, i) => (
            <Card
              key={i}
              variant="outlined"
              sx={{ borderRadius: 0, borderTop: "0px", borderRight: "0px" }}
            >
              <CardContent>
                <Box display="flex" flexDirection="column" gap={1.5} px={1}>
                  <Typography variant="h6" color="textSecondary">
                    {item.label}
                  </Typography>

                  <Box
                    sx={{
                      backgroundColor: item.bg,
                      width: 42,
                      height: 42,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 1,
                    }}
                  >
                    {item.icon}
                  </Box>

                  <Typography variant="h5">{item.value}</Typography>

                  <Typography variant="body1" color="textSecondary">
                    {item.description}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Box sx={{ width: "50%" }}>
          <Card
            variant="outlined"
            sx={{ borderRadius: "0px", borderTop: "0px" }}
          >
            <CardContent>
              <Box display="flex" justifyContent="space-between" mb={2} px={1}>
                <Typography variant="h6" color="textSecondary">
                  Equity Curve
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Simulated P&L over Time
                </Typography>
              </Box>
              <Line
                data={equityCurveData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                    tooltip: {
                      callbacks: {
                        label: (context) =>
                          `₹${context.parsed.y.toLocaleString()}`,
                      },
                    },
                  },
                  scales: {
                    y: {
                      title: {
                        display: true,
                        text: "Equity (₹)",
                      },
                      ticks: {
                        callback: (value) => `₹${value}`,
                      },
                    },
                    x: {
                      title: {
                        display: true,
                        text: "Time",
                      },
                    },
                  },
                }}
              />
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default DashboardStats;
