import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function AIQuiz() {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);

  const [quiz, setQuiz] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateQuiz = async () => {
    try {
      setLoading(true);

      const res = await api.post("/ai/generate-quiz", {
        topic,
        difficulty,
        numberOfQuestions,
      });

      setQuiz(res.data.quiz);
      setScore(null);
      setAnswers({});
    } catch (error) {
      console.error(error);
      alert("Failed to generate quiz");
    } finally {
      setLoading(false);
    }
  };

 const submitQuiz = async () => {
  let total = 0;

  quiz.forEach((q, index) => {
    if (answers[index] === q.answer) {
      total++;
    }
  });

  setScore(total);

  try {
    const response =
      await api.post(
        "/quizzes/result",
        {
          title: "AI Generated Quiz",
          topic,
          difficulty,
          score: total,
          totalQuestions:
            quiz.length,
          percentage:
            Math.round(
              (total /
                quiz.length) *
                100
            ),
        }
      );

    console.log(
      "QUIZ SAVED:",
      response.data
    );
  } catch (error) {
    console.error(
      "Save Result Error:",
      error.response?.data
    );

    alert(
      JSON.stringify(
        error.response?.data
      )
    );
  }
};

  

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">
        🤖 AI Quiz Generator
      </h1>

      <div className="mb-6">
        <Link
          to="/dashboard"
          className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg"
        >
          ← Dashboard
        </Link>
      </div>

      <div className="bg-slate-800 p-6 rounded-xl mb-8">
        <input
          type="text"
          placeholder="Enter Topic..."
          value={topic}
          onChange={(e) =>
  setTopic(e.target.value)
}
          className="w-full p-3 rounded bg-slate-700 mb-4"
        />

        <select
          value={difficulty}
          onChange={(e) =>
            setDifficulty(e.target.value)
          }
          className="w-full p-3 rounded bg-slate-700 mb-4"
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <input
          type="number"
          min="1"
          max="20"
          value={numberOfQuestions}
          onChange={(e) =>
            setNumberOfQuestions(
              Number(e.target.value)
            )
          }
          className="w-full p-3 rounded bg-slate-700 mb-4"
        />

        <button
          onClick={generateQuiz}
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 px-5 py-3 rounded-lg font-semibold"
        >
          {loading
            ? "Generating..."
            : "Generate Quiz"}
        </button>
      </div>

      {quiz.length > 0 && (
        <>
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span>Progress</span>
              <span>
                {Object.keys(answers).length}/
                {quiz.length}
              </span>
            </div>

            <div className="w-full bg-slate-700 rounded-full h-3">
              <div
                className="bg-purple-500 h-3 rounded-full"
                style={{
                  width: `${
                    (Object.keys(answers)
                      .length /
                      quiz.length) *
                    100
                  }%`,
                }}
              ></div>
            </div>
          </div>

          {/* Quiz Info */}
          <div className="mb-6 bg-slate-800 p-4 rounded-xl">
            <p className="text-lg text-slate-300">
              Total Questions: {quiz.length}
            </p>
          </div>

          {/* Questions */}
          {quiz.map((question, index) => (
            <div
              key={index}
              className="bg-slate-800 p-5 rounded-xl mb-5"
            >
              <h3 className="font-bold mb-4">
                {index + 1}.{" "}
                {question.question}
              </h3>

              {question.options.map(
                (option, optionIndex) => (
                  <label
                    key={optionIndex}
                    className={`block mb-2 p-2 rounded ${
                      score !== null
                        ? option ===
                          question.answer
                          ? "bg-green-700"
                          : answers[
                              index
                            ] === option
                          ? "bg-red-700"
                          : ""
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name={`q-${index}`}
                      value={option}
                      checked={
                        answers[index] ===
                        option
                      }
                      onChange={() =>
                        setAnswers({
                          ...answers,
                          [index]: option,
                        })
                      }
                    />

                    <span className="ml-2">
                      {option}
                    </span>
                  </label>
                )
              )}

              {score !== null && (
                <div className="mt-4">
                  <p className="text-green-400">
                    Correct Answer:{" "}
                    {question.answer}
                  </p>

                  <p className="text-slate-300 mt-2">
                    {
                      question.explanation
                    }
                  </p>
                </div>
              )}
            </div>
          ))}

          <button
            onClick={submitQuiz}
            disabled={
              Object.keys(answers)
                .length !== quiz.length
            }
            className={`px-5 py-3 rounded-lg font-semibold ${
              Object.keys(answers)
                .length ===
              quiz.length
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-600 cursor-not-allowed"
            }`}
          >
            Submit Quiz
          </button>
        </>
      )}

      {score !== null && (
        <div className="mt-8 bg-slate-800 p-6 rounded-xl">
          <h2 className="text-3xl font-bold">
            Score: {score}/
            {quiz.length}
          </h2>

          <p className="mt-3 text-xl">
            Percentage:{" "}
            {Math.round(
              (score / quiz.length) *
                100
            )}
            %
          </p>

          <button
            onClick={() => {
              setQuiz([]);
              setAnswers({});
              setScore(null);
              setTopic("");
              setDifficulty("Easy");
              setNumberOfQuestions(5);
            }}
            className="mt-5 bg-red-600 hover:bg-red-700 px-5 py-3 rounded-lg"
          >
            Reset Quiz
          </button>
        </div>
      )}
    </div>
  );
}

export default AIQuiz;