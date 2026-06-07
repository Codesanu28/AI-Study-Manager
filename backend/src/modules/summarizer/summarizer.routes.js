const express = require("express");

const protect =
  require("../../middleware/auth.middleware");

const summarizerController =
  require("./summarizer.controller");

const router = express.Router();

router.post(
  "/",
  protect,
  summarizerController.summarizeNote
);

module.exports = router;