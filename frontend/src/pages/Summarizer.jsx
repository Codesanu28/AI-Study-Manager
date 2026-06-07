import { useState } from "react";
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
        error.response?.data
          ?.message ||
          "Failed to generate summary"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-6">
        📚 AI Summarizer
      </h1>

      <textarea
        rows="10"
        value={text}
        onChange={(e) =>
          setText(e.target.value)
        }
        placeholder="Paste your notes here..."
        className="w-full p-4 rounded-lg text-black"
      />

      <button
        onClick={generateSummary}
        className="mt-4 px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        {loading
          ? "Generating..."
          : "Generate Summary"}
      </button>

      {summary && (
        <div className="mt-6 bg-slate-800 p-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-3">
            Summary
          </h2>

          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

export default Summarizer;