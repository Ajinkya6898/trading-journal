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
const newsletterRoutes = require("./routes/newsletter");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://localhost:8080",
      /https:\/\/.*\.vercel\.app$/, // Allow all vercel apps
    ];

    const isAllowed = allowedOrigins.some((allowedOrigin) => {
      if (typeof allowedOrigin === "string") {
        return origin === allowedOrigin;
      }
      return allowedOrigin.test(origin);
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      // For development, allow all origins
      callback(null, true);
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
    "Cache-Control",
  ],
};

app.use(cors(corsOptions));

// Handle preflight requests for all routes
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Test routes without authentication
app.get("/api/test-funds", (req, res) => {
  res.json({ message: "Fund routes are working!" });
});

app.get("/api/test-auth", (req, res) => {
  res.json({ message: "Auth routes path is working!" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/stock", tradeRoutes);
app.use("/api/mutual-funds", mutualFundRoutes);
app.use("/api/positions", positionRoutes);
app.use("/api/funds", fundTransactionRoutes);
app.use("/api/dashboard", dashboardStats);
app.use("/api/newsletter", newsletterRoutes);

// Test routes
app.get("/", (req, res) => {
  res.json({ message: "Server is running successfully!" });
});

app.get("/test", (req, res) => {
  res.json({ message: "Test route works!" });
});

app.get("/api", (req, res) => {
  res.json({ message: "API base route works!" });
});

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// MongoDB connection
mongoose
  .connect(process.env.atlus_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Only listen when not in Vercel environment
if (process.env.NODE_ENV !== "production") {
  app.listen(8080, () => {
    console.log(`Server started on http://localhost:8080`);
  });
}

// Export the app for Vercel
module.exports = app;
