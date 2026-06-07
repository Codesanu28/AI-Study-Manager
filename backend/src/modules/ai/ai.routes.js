const express = require("express");

const router = express.Router();

const aiController = require("./ai.controller");

// Generate Quiz
router.post(
  "/generate-quiz",
  aiController.generateQuiz
);

// Summarize Notes
router.post(
  "/summarize",
  aiController.summarizeNote
);

module.exports = router;