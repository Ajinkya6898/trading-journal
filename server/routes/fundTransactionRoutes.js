const express = require("express");
const router = express.Router();
const {
  addTransaction,
  getAllTransactions,
} = require("../controllers/fundTransactionController");
const protect = require("../middleware/authMiddleware");

router.post("/", protect, addTransaction);
router.get("/", protect, getAllTransactions);

module.exports = router;
