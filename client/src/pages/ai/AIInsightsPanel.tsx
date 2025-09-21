import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Divider,
  Button,
  Stack,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import axiosInstance from "../../store/axiosInstance";

const AIInsightsPanel = () => {
  const [insights, setInsights] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInsights = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axiosInstance.get("/ai/insights");
      setInsights(res.data.insights);
    } catch (err: any) {
      console.error("Error fetching AI insights:", err);
      setError("Failed to fetch AI insights. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  return (
    <Card
      sx={{
        borderRadius: 4,
        boxShadow: 6,
        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
        color: "white",
      }}
    >
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <AutoAwesomeIcon fontSize="large" />
          <Typography variant="h6" fontWeight="bold">
            AI Assistance Insights
          </Typography>
        </Stack>

        <Divider sx={{ mb: 2, borderColor: "rgba(255,255,255,0.3)" }} />

        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            py={6}
          >
            <CircularProgress color="inherit" />
          </Box>
        ) : error ? (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        ) : (
          <Box
            sx={{
              whiteSpace: "pre-wrap",
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              borderRadius: 2,
              p: 2,
              maxHeight: 400,
              overflowY: "auto",
            }}
          >
            <Typography variant="body2">{insights}</Typography>
          </Box>
        )}

        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="secondary"
            startIcon={<RefreshIcon />}
            onClick={fetchInsights}
            disabled={loading}
            sx={{
              textTransform: "none",
              borderRadius: 3,
              fontWeight: "bold",
            }}
          >
            Refresh Insights
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AIInsightsPanel;
