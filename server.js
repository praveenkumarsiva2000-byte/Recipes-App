const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const recipeRoutes = require("./routes/recipeRoutes");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");

// ─── Load environment variables ───────────────
dotenv.config();

// ─── Connect to MongoDB ────────────────────────
connectDB();

const app = express();

// ─── Core Middleware ───────────────────────────
app.use(cors());                          // Enable CORS for all origins
app.use(express.json());                  // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// ─── Health Check Route ────────────────────────
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🍽️  Recipes API is running",
    version: "1.0.0",
    endpoints: {
      recipes: "/api/recipes",
    },
  });
});

// ─── API Routes ────────────────────────────────
app.use("/api/recipes", recipeRoutes);

// ─── Error Handling Middleware ─────────────────
app.use(notFound);       // 404 handler for unknown routes
app.use(errorHandler);   // Global error handler

// ─── Start Server ──────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `🚀 Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`
  );
});

module.exports = app;
