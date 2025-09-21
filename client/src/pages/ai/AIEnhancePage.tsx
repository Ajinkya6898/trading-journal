import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { Box, Typography, CircularProgress, Paper } from "@mui/material";
import axiosInstance from "../../store/axiosInstance";

const AIEnhancePage: React.FC = () => {
  const { tradeId } = useParams<{ tradeId: string }>();
  const [insightHtml, setInsightHtml] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await axiosInstance.get(`/ai/insights/${tradeId}`);
        // backend returns insightHtml (sanitized)
        const html =
          res.data.insightHtml || res.data.insights || res.data.insight || "";
        setInsightHtml(html);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch AI insights. Try again.");
      } finally {
        setLoading(false);
      }
    })();
  }, [tradeId]);

  if (loading) return <CircularProgress />;

  if (error) return <Typography color="error">{error}</Typography>;

  // Extra client-side sanitation (belt & suspenders)
  const clean = DOMPurify.sanitize(insightHtml);

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        AI Insights
      </Typography>

      <Paper sx={{ p: 2 }}>
        <div
          // render the sanitized HTML
          dangerouslySetInnerHTML={{ __html: clean }}
        />
      </Paper>
    </Box>
  );
};

export default AIEnhancePage;
