import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function Quizzes() {
const [quizzes, setQuizzes] = useState([]);

useEffect(() => {
fetchQuizzes();
}, []);

const fetchQuizzes = async () => {
try {
const res = await api.get("/quizzes");


  setQuizzes(
    res.data.quizzes || []
  );
} catch (error) {
  console.error(error);
}

};

const deleteQuiz = async (id) => {
try {
await api.delete(
`/quizzes/${id}`
);


  fetchQuizzes();
} catch (error) {
  console.error(error);
  alert("Failed to delete quiz");
}


};

return ( <div className="min-h-screen bg-slate-900 text-white p-8"> <div className="flex justify-between items-center mb-8"> <h1 className="text-4xl font-bold">
📊 Quiz History </h1>


    <Link
      to="/dashboard"
      className="bg-slate-700 px-4 py-2 rounded-lg hover:bg-slate-600"
    >
      ← Dashboard
    </Link>
  </div>

  {quizzes.length === 0 ? (
    <div className="bg-slate-800 p-6 rounded-xl">
      <p className="text-slate-400">
        No quiz attempts found.
      </p>
    </div>
  ) : (
    <div className="grid gap-4">
      {quizzes.map((quiz) => (
        <div
          key={quiz._id}
          className="bg-slate-800 p-6 rounded-xl shadow-lg"
        >
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">
                {quiz.topic}
              </h2>

              <p className="text-slate-400">
                Difficulty:
                {" "}
                {quiz.difficulty}
              </p>

              <p className="text-slate-400">
                Score:
                {" "}
                {quiz.score}/
                {quiz.totalQuestions}
              </p>

              <p className="text-green-400 font-semibold">
                {quiz.percentage}%
              </p>

              <p className="text-xs text-slate-500 mt-2">
                {new Date(
                  quiz.createdAt
                ).toLocaleString()}
              </p>
            </div>

            <button
              onClick={() =>
                deleteQuiz(
                  quiz._id
                )
              }
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )}
</div>


);
}

export default Quizzes;
