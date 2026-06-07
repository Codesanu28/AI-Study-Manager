const express = require("express");
const cors = require("cors");

const routes = require("./routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AI Study Manager API Running",
  });
});

// API Routes
app.use("/api/v1", routes);

module.exports = app;