import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function Summarizer() {
const [text, setText] = useState("");
const [summary, setSummary] = useState("");
const [loading, setLoading] = useState(false);

const generateSummary = async () => {
if (!text.trim()) {
alert("Please enter some text");
return;
}

try {
  setLoading(true);

  const res = await api.post(
    "/summarizer",
    {
      text,
    }
  );

  setSummary(
    res.data.summary || ""
  );
} catch (error) {
  console.error(error);

  alert(
    error.response?.data?.message ||
    "Failed to generate summary"
  );
} finally {
  setLoading(false);
}


};

const clearAll = () => {
setText("");
setSummary("");
};

return ( <div className="min-h-screen bg-slate-900 text-white p-8">


  <div className="flex justify-between items-center mb-8">
    <h1 className="text-4xl font-bold">
      📚 AI Summarizer
    </h1>

    <Link
      to="/dashboard"
      className="bg-slate-700 px-4 py-2 rounded-lg hover:bg-slate-600"
    >
      ← Dashboard
    </Link>
  </div>

  <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
    <label className="block mb-3 text-lg font-semibold">
      Paste Your Notes
    </label>

    <textarea
      rows="10"
      value={text}
      onChange={(e) =>
        setText(e.target.value)
      }
      placeholder="Paste your study notes here..."
      className="w-full p-4 rounded-lg text-black resize-none"
    />

    <div className="flex gap-4 mt-4">
      <button
        onClick={generateSummary}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold"
      >
        {loading
          ? "Generating..."
          : "Generate Summary"}
      </button>

      <button
        onClick={clearAll}
        className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold"
      >
        Clear
      </button>
    </div>
  </div>

  {summary && (
    <div className="mt-8 bg-slate-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">
        📄 Summary
      </h2>

      <p className="leading-7 whitespace-pre-wrap">
        {summary}
      </p>
    </div>
  )}
</div>


);
}

export default Summarizer;
