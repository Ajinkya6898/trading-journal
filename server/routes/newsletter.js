// import Subscriber from "../models/Subscriber";
const express = require("express");
const Subscriber = require("../model/Subscriber");

const router = express.Router();

router.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  // Basic email validation
  if (!email || !/.+@.+\..+/.test(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  try {
    // Check for duplicates
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Already subscribed" });
    }

    // Save to DB
    const subscriber = new Subscriber({ email });
    await subscriber.save();

    res.status(201).json({ message: "Subscribed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
