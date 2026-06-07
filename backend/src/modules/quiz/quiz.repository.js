const Quiz = require("./quiz.model");

const createQuiz = async (data) => {
  return await Quiz.create(data);
};

const getQuizzesByUser = async (userId) => {
  return await Quiz.find({
    user: userId,
  }).sort({ createdAt: -1 });
};

const getQuizById = async (id) => {
  return await Quiz.findById(id);
};

const updateQuiz = async (
  id,
  data
) => {
  return await Quiz.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
    }
  );
};

const deleteQuiz = async (id) => {
  return await Quiz.findByIdAndDelete(id);
};

module.exports = {
  createQuiz,
  getQuizzesByUser,
  getQuizById,
  updateQuiz,
  deleteQuiz,
};