const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./controllers/userController");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const path = require("path");
const tradeRoutes = require("./routes/StocksRoutes");
const mutualFundRoutes = require("./routes/mutualFundRoutes");
const positionRoutes = require("./routes/positionRoutes");
const fundTransactionRoutes = require("./routes/fundTransactionRoutes");
const dashboardStats = require("./routes/dashboardRoutes");

const app = express();

app.use(bodyParser.json());

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/stock", tradeRoutes);
app.use("/api/mutual-funds", mutualFundRoutes);
app.use("/api/positions", positionRoutes);
app.use("/api/funds", fundTransactionRoutes);
app.use("/api/dashboard", dashboardStats);

mongoose
  .connect("mongodb://localhost:27017/trading-journal")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(8080, () => {
  console.log(` Server started on http://localhost:${8080}`);
});
