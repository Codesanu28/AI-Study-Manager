const aiService = require("./ai.service");

// ===============================
// Generate Quiz Controller
// ===============================
const generateQuiz = async (
  req,
  res
) => {
  try {
    const {
      topic,
      difficulty,
      numberOfQuestions,
    } = req.body;

    const quiz =
      await aiService.generateQuiz(
        topic,
        difficulty,
        numberOfQuestions
      );

    const parsedQuiz = JSON.parse(quiz);

    res.status(200).json({
      success: true,
      quiz: parsedQuiz,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Summarize Note Controller
// ===============================
const summarizeNote = async (
  req,
  res
) => {
  try {
    const { content } = req.body;

    const summary =
      await aiService.summarizeNote(
        content
      );

    res.status(200).json({
      success: true,
      summary,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  generateQuiz,
  summarizeNote,
};