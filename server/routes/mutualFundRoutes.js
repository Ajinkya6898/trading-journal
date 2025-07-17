const express = require("express");
const {
  addMutualFundEntry,
  getMutualFundEntries,
} = require("../controllers/mutualFundController");
const router = express.Router();

router.post("/", addMutualFundEntry);
router.get("/", getMutualFundEntries);

module.exports = router;
