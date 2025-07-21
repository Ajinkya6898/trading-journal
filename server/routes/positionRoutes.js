const express = require("express");
const router = express.Router();
const {
  createPosition,
  getUserPositions,
  deletePosition,
  updatePosition,
} = require("../controllers/positionController");
const protect = require("../middleware/authMiddleware");

router.post("/", protect, createPosition);

router.get("/", protect, getUserPositions);

router.delete("/:id", protect, deletePosition);

router.put("/:id", protect, updatePosition);

module.exports = router;
