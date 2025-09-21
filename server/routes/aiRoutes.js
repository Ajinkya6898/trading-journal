const express = require("express");
const router = express.Router();
const {
  getAIInsights,
  getAIInsightByTrade,
} = require("../controllers/aiController");

router.get("/insights", getAIInsights);
router.get("/insights/:tradeId", getAIInsightByTrade);

module.exports = router;
