const express = require("express");
const router = express.Router();

const {
  createRiskPosition,
  getRiskPositions,
  updateRiskPosition,
  deleteRiskPosition,
} = require("../controllers/riskBasedPositionController");
const protect = require("../middleware/authMiddleware");

router.post("/", protect, createRiskPosition);

router.get("/", protect, getRiskPositions);

router.delete("/:id", protect, deleteRiskPosition);

router.put("/:id", protect, updateRiskPosition);

module.exports = router;
