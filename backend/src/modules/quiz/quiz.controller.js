const quizService =
  require("./quiz.service");

const createQuiz = async (
  req,
  res
) => {
  try {
    const quiz =
      await quizService.createQuiz(
        req.user.id,
        req.body
      );

    res.status(201).json({
      success: true,
      quiz,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getQuizzes = async (
  req,
  res
) => {
  try {
    const quizzes =
      await quizService.getQuizzes(
        req.user.id
      );

    res.status(200).json({
      success: true,
      quizzes,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateQuiz = async (
  req,
  res
) => {
  try {
    const quiz =
      await quizService.updateQuiz(
        req.params.id,
        req.user.id,
        req.body
      );

    res.status(200).json({
      success: true,
      quiz,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const saveQuizResult =
  async (
    req,
    res
  ) => {
    try {
      const quiz =
        await quizService.saveQuizResult(
          req.user.id,
          req.body
        );

      res.status(201).json({
        success: true,
        quiz,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message:
          error.message,
      });
    }
  };

const deleteQuiz = async (
  req,
  res
) => {
  try {
    await quizService.deleteQuiz(
      req.params.id,
      req.user.id
    );

    res.status(200).json({
      success: true,
      message:
        "Quiz deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createQuiz,
  getQuizzes,
  updateQuiz,
  saveQuizResult,
  deleteQuiz,
};
