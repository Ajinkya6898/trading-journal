import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";

const portfolioData = [
  {
    title: "Stocks",
    ringColor: "#4f46e5",
    investment: 565694,
    currentValue: 695276.75,
    profit: 129582.75,
    profitPercent: 22.91,
    progress: 70,
  },
  {
    title: "Mutual Funds",
    ringColor: "#f97316",
    investment: 0,
    currentValue: 0,
    profit: 0,
    profitPercent: 0,
    progress: 70,
  },
  {
    title: "ETFs",
    ringColor: "#455a64",
    investment: 0,
    currentValue: 0,
    profit: 0,
    profitPercent: 0,
    progress: 30,
  },
  {
    title: "Crypto",
    ringColor: "#1de9b6",
    investment: 0,
    currentValue: 0,
    profit: 0,
    profitPercent: 10,
    progress: 5,
  },
];

const RingProgress = ({ value, color }) => {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        variant="determinate"
        value={100}
        size={96}
        sx={{ color: "#e0e0e0", position: "absolute" }}
      />
      <CircularProgress
        variant="determinate"
        value={value}
        size={96}
        sx={{ color }}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          fontWeight: "bold",
          fontSize: "1rem",
          backgroundColor: "#fff",
          borderRadius: "50%",
          width: 66,
          height: 66,
          margin: "auto",
        }}
      >
        {`${value.toFixed(0)}%`}
      </Box>
    </Box>
  );
};

const PortfolioDistribution = () => {
  return (
    <Box sx={{ width: "100%" }} mt={2}>
      <Typography variant="h6" gutterBottom>
        Portfolio Distribution
      </Typography>

      {/* Custom row layout without spacing */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        {portfolioData.map((item) => (
          <Box
            key={item.title}
            sx={{
              width: "25%",
              minWidth: "250px",
              borderRight: "1px solid #e0e0e0",
              "&:last-child": { borderRight: "none" },
            }}
          >
            <Card
              variant="outlined"
              sx={{ borderRadius: 0, height: "100%" }}
              elevation={0}
            >
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  px: 2,
                  py: 2,
                }}
              >
                {/* Left Text Info */}
                <Box>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      borderLeft: `4px solid ${item.ringColor}`,
                      pl: 1,
                      mb: 1,
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography variant="body2">
                    Investment: ₹{item.investment.toLocaleString("en-IN")}
                  </Typography>
                  <Typography variant="body2">
                    Current Value: ₹{item.currentValue.toLocaleString("en-IN")}
                  </Typography>
                  <Typography variant="body2">
                    Profit:{" "}
                    <span style={{ color: item.profit >= 0 ? "green" : "red" }}>
                      ₹{item.profit.toLocaleString("en-IN")}
                    </span>
                  </Typography>
                  <Typography variant="body2">
                    Profit %:{" "}
                    <span
                      style={{
                        color: item.profitPercent >= 0 ? "green" : "red",
                      }}
                    >
                      {item.profitPercent.toFixed(2)}%
                    </span>
                  </Typography>
                </Box>

                {/* Right Ring */}
                <Box textAlign="center">
                  <RingProgress value={item.progress} color={item.ringColor} />
                  <Typography
                    variant="caption"
                    sx={{ mt: 1, display: "block" }}
                  >
                    of Total
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PortfolioDistribution;
