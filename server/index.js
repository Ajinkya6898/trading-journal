const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const tradeRoutes = require("./routes/StocksRoutes");
const mutualFundRoutes = require("./routes/mutualFundRoutes");
const positionRoutes = require("./routes/positionRoutes");
const fundTransactionRoutes = require("./routes/fundTransactionRoutes");
const dashboardStats = require("./routes/dashboardRoutes");
const newsletterRoutes = require("./routes/newsletter");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://your-frontend.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.options("*", cors());

app.use(express.json());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/stock", tradeRoutes);
app.use("/api/mutual-funds", mutualFundRoutes);
app.use("/api/positions", positionRoutes);
app.use("/api/funds", fundTransactionRoutes);
app.use("/api/dashboard", dashboardStats);
app.use("/api/newsletter", newsletterRoutes);

mongoose
  .connect(process.env.atlus_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(8080, () => {
  console.log(`🚀 Server started at http://localhost:8080`);
});
