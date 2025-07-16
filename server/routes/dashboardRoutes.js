const express = require("express");
const router = express.Router();
const { getMonthlyTradeStats } = require("../controllers/dashboardController");

router.get("/", getMonthlyTradeStats);

module.exports = router;
