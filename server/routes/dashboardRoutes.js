const express = require("express");
const router = express.Router();
const {
  getDashboardData,
  getMonthlyTradeStats,
} = require("../controllers/dashboardController");
const protect = require("../middleware/authMiddleware");

// Make sure the route path is explicit and doesn't contain malformed parameters
router.get("/data", protect, getDashboardData);
router.get("/monthly-stats", protect, getMonthlyTradeStats);

// If you want to keep the root route, make it explicit
router.get("/", protect, getDashboardData);

module.exports = router;
