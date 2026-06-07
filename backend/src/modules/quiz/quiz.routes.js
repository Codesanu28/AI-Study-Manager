const express = require("express");

const protect =
  require("../../middleware/auth.middleware");

const quizController =
  require("./quiz.controller");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Quiz CRUD
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  protect,
  quizController.createQuiz
);

router.get(
  "/",
  protect,
  quizController.getQuizzes
);

router.put(
  "/:id",
  protect,
  quizController.updateQuiz
);

router.delete(
  "/:id",
  protect,
  quizController.deleteQuiz
);

/*
|--------------------------------------------------------------------------
| Quiz Results
|--------------------------------------------------------------------------
*/

router.post(
  "/result",
  protect,
  quizController.saveQuizResult
);

module.exports = router;