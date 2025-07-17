const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const JWT_SECRET = "your_secret_key_here";

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ email, password });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "24h" });

    res.status(201).json({
      token,
      isNewUser: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "24h" });

    res.json({
      id: user._id,
      email: user.email,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
