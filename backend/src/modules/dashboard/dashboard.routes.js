const express = require("express");

const protect = require("../../middleware/auth.middleware");

const dashboardController = require("./dashboard.controller");

const router = express.Router();

router.get(
  "/",
  protect,
  dashboardController.getDashboard
);

module.exports = router;