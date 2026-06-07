const express = require("express");

const authRoutes =
  require("../modules/auth/auth.routes");

const dashboardRoutes =
  require("../modules/dashboard/dashboard.routes");

const noteRoutes =
  require("../modules/note/note.routes");
  const quizRoutes =
  require("../modules/quiz/quiz.routes");
  const aiRoutes =
  require("../modules/ai/ai.routes");
  const plannerRoutes =
require("../modules/planner/planner.routes");
const summarizerRoutes =
require("../modules/summarizer/summarizer.routes");

const router = express.Router();

router.use("/auth", authRoutes);

router.use(
  "/dashboard",
  dashboardRoutes
);

router.use(
  "/notes",
  noteRoutes
);
router.use(
  "/quizzes",
  quizRoutes
);
router.use("/ai", aiRoutes);
router.use(
  "/planner",
  plannerRoutes
);
router.use(
  "/summarizer",
  summarizerRoutes
);
module.exports = router;