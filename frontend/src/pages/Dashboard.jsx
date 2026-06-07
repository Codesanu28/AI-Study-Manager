import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function Dashboard() {
  const [stats, setStats] = useState({
  notes: 0,
  quizzes: 0,
  plans: 0,
});

const [quizHistory, setQuizHistory] =
  useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const notesRes = await api.get("/notes");
      console.log("NOTES:", notesRes.data);

      let quizzesCount = 0;
      let plansCount = 0;

      try {
        const quizzesRes = await api.get("/quizzes");
        setQuizHistory(
  quizzesRes.data.quizzes || []
);
        quizzesCount =
          quizzesRes.data.quizzes?.length || 0;
      } catch (err) {
        console.log("Quiz API not ready");
      }

      try {
        const plannerRes = await api.get("/planner");
        plansCount =
          plannerRes.data.plans?.length || 0;
      } catch (err) {
        console.log("Planner API not ready");
      }

      setStats({
        notes: notesRes.data.notes?.length || 0,
        quizzes: quizzesCount,
        plans: plansCount,
      });
    } catch (error) {
      console.error(
        "Dashboard Error:",
        error
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 p-6">
        <h2 className="text-2xl font-bold mb-8">
          AI Study Manager
        </h2>

        <ul className="space-y-4">
          <li>
            <Link
              to="/dashboard"
              className="hover:text-blue-400"
            >
              📊 Dashboard
            </Link>
          </li>

          <li>
            <Link
              to="/notes"
              className="hover:text-blue-400"
            >
              📝 Notes
            </Link>
          </li>

          <li>
            <Link
              to="/quizzes"
              className="hover:text-blue-400"
            >
              ❓ Quizzes
            </Link>
          </li>

          <li>
            <Link
              to="/planner"
              className="hover:text-blue-400"
            >
              📅 Planner
            </Link>
          </li>

          <li>
  <Link
    to="/aiquiz"
    className="hover:text-blue-400"
  >
    🤖 AI Quiz
  </Link>
</li>

          <li>
            <Link
              to="/summarizer"
              className="hover:text-blue-400"
            >
              📚 Summarizer
            </Link>
          </li>

          <li
            onClick={handleLogout}
            className="text-red-400 cursor-pointer hover:text-red-300"
          >
            🚪 Logout
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-8">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl">
              📝 Notes
            </h2>

            <p className="text-4xl font-bold mt-3">
              {stats.notes}
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl">
              ❓ Quizzes
            </h2>

            <p className="text-4xl font-bold mt-3">
              {stats.quizzes}
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl">
              📅 Study Plans
            </h2>

            <p className="text-4xl font-bold mt-3">
              {stats.plans}
            </p>
          </div>
        </div>
                   {/* Quiz History */}
        <div className="mt-10 bg-slate-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">
            📊 Quiz History
          </h2>

          {quizHistory.length === 0 ? (
            <p className="text-slate-400">
              No quiz attempts yet.
            </p>
          ) : (
            <div className="space-y-3">
              {quizHistory
                .slice(0, 5)
                .map((quiz) => (
                  <div
                    key={quiz._id}
                    className="flex justify-between bg-slate-700 p-3 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold">
                        {quiz.topic}
                      </p>

                      <p className="text-sm text-slate-400">
                        {quiz.difficulty}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-green-400 font-bold">
                        {quiz.percentage}%
                      </p>

                      <p className="text-xs text-slate-400">
                        {quiz.score}/
                        {quiz.totalQuestions}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="mt-10 bg-slate-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold">
            Recent Activity
          </h2>
        

          <p className="text-slate-400 mt-3">
            Welcome to AI Study Manager 🚀
          </p>

          <ul className="mt-4 space-y-2">
            <li>
              Total Notes: {stats.notes}
            </li>

            <li>
              Total Quizzes: {stats.quizzes}
            </li>

            <li>
              Total Study Plans: {stats.plans}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;