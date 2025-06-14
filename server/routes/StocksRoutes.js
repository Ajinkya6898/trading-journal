const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  createTradeEntry,
  getAllTradeEntries,
} = require("../controllers/StockController");

router.post("/", upload.single("tradeImage"), createTradeEntry);
router.get("/", getAllTradeEntries);

module.exports = router;
