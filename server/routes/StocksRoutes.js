const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  createTradeEntry,
  getAllTradeEntries,
} = require("../controllers/StockController");
const protect = require("../middleware/authMiddleware");

router.post("/", protect, upload.single("tradeImage"), createTradeEntry);
router.get("/", protect, getAllTradeEntries);

module.exports = router;
