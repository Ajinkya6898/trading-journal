const express = require("express");
const {
  addMutualFundEntry,
  getMutualFundEntries,
} = require("../controllers/mutualFundController");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

router.post("/", protect, addMutualFundEntry);
router.get("/", protect, getMutualFundEntries);

module.exports = router;
