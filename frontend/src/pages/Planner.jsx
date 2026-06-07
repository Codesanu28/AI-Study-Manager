
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function Planner() {
  const [plans, setPlans] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [status, setStatus] = useState("Pending");
  const [progress, setProgress] = useState(0);
  const [editingId, setEditingId] = useState(null);

  const [analytics, setAnalytics] = useState({
    totalPlans: 0,
    completedPlans: 0,
    pendingPlans: 0,
    inProgressPlans: 0,
  });

  // AI Planner States
  const [goal, setGoal] = useState("");
  const [hoursPerDay, setHoursPerDay] = useState(2);
  const [level, setLevel] = useState("Beginner");
  const [aiPlan, setAiPlan] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
    fetchPlans();
    fetchAnalytics();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await api.get("/planner");
      setPlans(res.data.plans || []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const res = await api.get("/planner/analytics");
      setAnalytics(res.data.analytics);
    } catch (error) {
      console.error(error);
    }
  };

  const generateAIPlan = async () => {
    try {
      setLoadingAI(true);

      const res = await api.post(
        "/planner/generate",
        {
          goal,
          hoursPerDay,
          level,
          targetDate,
        }
      );

      setAiPlan(res.data.plan);
    } catch (error) {
      console.error(error);
      alert("Failed to generate AI plan");
    } finally {
      setLoadingAI(false);
    }
  };

  const createPlan = async () => {
    try {
      await api.post("/planner", {
        title,
        description,
        targetDate,
        status,
        progress,
      });

      resetForm();
      fetchPlans();
      fetchAnalytics();
    } catch (error) {
      console.error(error);
    }
  };

  const updatePlan = async () => {
    try {
      await api.put(`/planner/${editingId}`, {
        title,
        description,
        targetDate,
        status,
        progress,
      });

      resetForm();
      fetchPlans();
      fetchAnalytics();
    } catch (error) {
      console.error(error);
    }
  };

  const deletePlan = async (id) => {
    if (!window.confirm("Delete this plan?")) return;

    try {
      await api.delete(`/planner/${id}`);

      fetchPlans();
      fetchAnalytics();
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setTargetDate("");
    setStatus("Pending");
    setProgress(0);
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="flex justify-between mb-8">
        <h1 className="text-4xl font-bold">
          📅 Study Planner
        </h1>

        <Link
          to="/dashboard"
          className="bg-slate-700 px-4 py-2 rounded-lg"
        >
          ← Dashboard
        </Link>
      </div>

      {/* Analytics */}

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-800 p-4 rounded-xl">
          <h3>Total</h3>
          <p className="text-3xl font-bold">
            {analytics.totalPlans}
          </p>
        </div>

        <div className="bg-slate-800 p-4 rounded-xl">
          <h3>Completed</h3>
          <p className="text-3xl font-bold text-green-400">
            {analytics.completedPlans}
          </p>
        </div>

        <div className="bg-slate-800 p-4 rounded-xl">
          <h3>Pending</h3>
          <p className="text-3xl font-bold text-yellow-400">
            {analytics.pendingPlans}
          </p>
        </div>

        <div className="bg-slate-800 p-4 rounded-xl">
          <h3>In Progress</h3>
          <p className="text-3xl font-bold text-blue-400">
            {analytics.inProgressPlans}
          </p>
        </div>
      </div>

      {/* AI Planner */}

      <div className="bg-slate-800 p-6 rounded-xl mb-8">
        <h2 className="text-2xl mb-4">
          🤖 AI Study Planner
        </h2>

        <input
          type="text"
          placeholder="Goal (Example: Complete Striver A2Z DSA Sheet)"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="w-full p-3 rounded bg-slate-700 mb-4"
        />

        <input
          type="number"
          placeholder="Hours Per Day"
          value={hoursPerDay}
          onChange={(e) => setHoursPerDay(e.target.value)}
          className="w-full p-3 rounded bg-slate-700 mb-4"
        />

        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="w-full p-3 rounded bg-slate-700 mb-4"
        >
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>

        <button
          onClick={generateAIPlan}
          className="bg-purple-600 hover:bg-purple-700 px-5 py-3 rounded-lg"
        >
          {loadingAI
            ? "Generating..."
            : "Generate AI Plan"}
        </button>

        {aiPlan && (
          <div className="mt-6 bg-slate-700 p-5 rounded-xl">
            <h3 className="text-xl font-bold mb-3">
              📚 AI Generated Roadmap
            </h3>

            <pre className="whitespace-pre-wrap">
              {aiPlan}
            </pre>
          </div>
        )}
      </div>

      {/* Form */}

      <div className="bg-slate-800 p-6 rounded-xl mb-8">
        <h2 className="text-2xl mb-4">
          {editingId
            ? "Edit Plan"
            : "Create Plan"}
        </h2>

        <input
          type="text"
          placeholder="Plan Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full p-3 rounded bg-slate-700 mb-4"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          className="w-full p-3 rounded bg-slate-700 mb-4"
        />

        <input
          type="date"
          value={targetDate}
          onChange={(e) =>
            setTargetDate(
              e.target.value
            )
          }
          className="w-full p-3 rounded bg-slate-700 mb-4"
        />

        <select
          value={status}
          onChange={(e) =>
            setStatus(
              e.target.value
            )
          }
          className="w-full p-3 rounded bg-slate-700 mb-4"
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={(e) =>
            setProgress(
              e.target.value
            )
          }
          className="w-full mb-2"
        />

        <p className="mb-4">
          Progress: {progress}%
        </p>

        <button
          onClick={
            editingId
              ? updatePlan
              : createPlan
          }
          className="bg-blue-600 px-5 py-3 rounded-lg"
        >
          {editingId
            ? "Update Plan"
            : "Create Plan"}
        </button>
      </div>

      {/* Plans */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {plans.map((plan) => (
          <div
            key={plan._id}
            className="bg-slate-800 p-5 rounded-xl"
          >
            <h3 className="text-xl font-bold">
              {plan.title}
            </h3>

            <p className="mt-2 text-slate-300">
              {plan.description}
            </p>

            <p className="mt-2">
              📅{" "}
              {new Date(
                plan.targetDate
              ).toLocaleDateString()}
            </p>

            <p className="mt-2">
              Status: {plan.status}
            </p>

            <div className="w-full bg-slate-700 h-3 rounded-full mt-3">
              <div
                className="bg-green-500 h-3 rounded-full"
                style={{
                  width: `${plan.progress}%`,
                }}
              />
            </div>

            <p className="mt-2">
              {plan.progress}%
            </p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => {
                  setEditingId(
                    plan._id
                  );
                  setTitle(plan.title);
                  setDescription(
                    plan.description
                  );
                  setTargetDate(
                    plan.targetDate.split(
                      "T"
                    )[0]
                  );
                  setStatus(
                    plan.status
                  );
                  setProgress(
                    plan.progress
                  );
                }}
                className="bg-green-600 px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() =>
                  deletePlan(
                    plan._id
                  )
                }
                className="bg-red-600 px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Planner;

