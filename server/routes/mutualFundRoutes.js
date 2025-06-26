// routes/mutualFundRoutes.js

const express = require("express");
const router = express.Router();
const MutualFundTransaction = require("../model/MutualFundSchema");

router.post("/add", async (req, res) => {
  try {
    const { fundName, transactionDate, units, nav, amount } = req.body;

    const newTransaction = new MutualFundTransaction({
      fundName,
      transactionDate,
      units,
      nav,
      amount,
    });

    await newTransaction.save();
    res
      .status(201)
      .json({ message: "Mutual Fund transaction added successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add transaction" });
  }
});

router.get("/", async (req, res) => {
  try {
    const transactions = await MutualFundTransaction.find().sort({
      transactionDate: -1,
    });
    res.status(200).json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

module.exports = router;
