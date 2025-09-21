const express = require("express");
const router = express.Router();
const { getCommonData } = require("../controllers/commonController");
const protect = require("../middleware/authMiddleware");

// GET common data
router.get("/", protect, getCommonData);

module.exports = router;
