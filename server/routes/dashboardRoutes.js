const express = require("express");
const router = express.Router();
const { getMonthlyTradeStats } = require("../controllers/dashboardController");
const protect = require("../middleware/authMiddleware");

router.get("/", protect, getMonthlyTradeStats);

module.exports = router;
