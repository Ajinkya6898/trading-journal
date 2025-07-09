const express = require("express");
const router = express.Router();
const {
  addTransaction,
  getAllTransactions,
} = require("../controllers/fundTransactionController");

router.post("/", addTransaction);
router.get("/", getAllTransactions);

module.exports = router;
