const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  createGoal,
  getGoalProgress,
} = require("../controllers/goalController");

router.post("/create", protect, createGoal);
router.get("/details", protect, getGoalProgress);

module.exports = router;
