const quizRepository =
  require("./quiz.repository");

const createQuiz = async (
  userId,
  data
) => {
  return await quizRepository.createQuiz({
    ...data,
    user: userId,
  });
};

const getQuizzes = async (
  userId
) => {
  return await quizRepository.getQuizzesByUser(
    userId
  );
};

const updateQuiz = async (
  quizId,
  userId,
  data
) => {
  const quiz =
    await quizRepository.getQuizById(
      quizId
    );

  if (!quiz) {
    throw new Error(
      "Quiz not found"
    );
  }

  if (
    quiz.user.toString() !== userId
  ) {
    throw new Error(
      "Unauthorized"
    );
  }

  return await quizRepository.updateQuiz(
    quizId,
    data
  );
};

const saveQuizResult =
  async (
    userId,
    data
  ) => {
    return await quizRepository.createQuiz(
      {
        ...data,
        user: userId,
      }
    );
  };

const deleteQuiz = async (
  quizId,
  userId
) => {
  const quiz =
    await quizRepository.getQuizById(
      quizId
    );

  if (!quiz) {
    throw new Error(
      "Quiz not found"
    );
  }

  if (
    quiz.user.toString() !==
    userId
  ) {
    throw new Error(
      "Not authorized to delete this quiz"
    );
  }

  return await quizRepository.deleteQuiz(
    quizId
  );
};

module.exports = {
  createQuiz,
  getQuizzes,
  updateQuiz,
  saveQuizResult,
  deleteQuiz,
};