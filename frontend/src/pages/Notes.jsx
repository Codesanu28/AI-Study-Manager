import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [category, setCategory] =
    useState("Other");

  const [filterCategory, setFilterCategory] =
    useState("All");
    const [summary, setSummary] = useState("");
const [showSummary, setShowSummary] =
  useState(false);
const [loadingSummary, setLoadingSummary] =
  useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await api.get("/notes");
      setNotes(res.data.notes || []);
    } catch (error) {
      console.error(error);
    }
  };

  const createNote = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Please fill all fields");
      return;
    }

    try {
      await api.post("/notes", {
        title,
        content,
        category,
      });

      setTitle("");
      setContent("");
      setCategory("Other");

      fetchNotes();
    } catch (error) {
      console.error(error);
    }
  };

  const updateNote = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Please fill all fields");
      return;
    }

    try {
      await api.put(`/notes/${editingId}`, {
        title,
        content,
        category,
      });

      setEditingId(null);
      setTitle("");
      setContent("");
      setCategory("Other");

      fetchNotes();
    } catch (error) {
      console.error(error);
    }
  };

  const togglePin = async (id) => {
    try {
      await api.patch(`/notes/${id}/pin`);
      fetchNotes();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNote = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/notes/${id}`);
      fetchNotes();
    } catch (error) {
      console.error(error);
    }
  };
  const summarizeNote = async (content) => {
  try {
    setLoadingSummary(true);
    setShowSummary(true);

    const res = await api.post("/ai/summarize", {
      content,
    });

    setSummary(res.data.summary);
  } catch (error) {
    console.error(error);
    alert("Failed to generate summary");
  } finally {
    setLoadingSummary(false);
  }
};

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      note.content
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      filterCategory === "All" ||
      note.category === filterCategory;

    return (
      matchesSearch &&
      matchesCategory
    );
  });

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">
            📝 Notes
          </h1>

          <p className="text-slate-400 mt-2">
            Manage all your study notes
          </p>
        </div>

        <Link
          to="/dashboard"
          className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg"
        >
          ← Dashboard
        </Link>
      </div>

      {/* Create / Edit Note */}
      <div className="bg-slate-800 p-6 rounded-2xl shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          {editingId
            ? "✏️ Edit Note"
            : "Create New Note"}
        </h2>

        <input
          type="text"
          placeholder="Enter note title..."
          className="w-full p-3 rounded-lg bg-slate-700 text-white placeholder-slate-400 border border-slate-600 mb-4 outline-none focus:border-blue-500"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        {/* Category Dropdown */}
        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600 mb-4"
        >
          <option value="DSA">DSA</option>
          <option value="DBMS">DBMS</option>
          <option value="OS">OS</option>
          <option value="CN">CN</option>
          <option value="Aptitude">
            Aptitude
          </option>
          <option value="Other">
            Other
          </option>
        </select>

        <textarea
          rows="5"
          placeholder="Write your note here..."
          className="w-full p-3 rounded-lg bg-slate-700 text-white placeholder-slate-400 border border-slate-600 mb-4 outline-none focus:border-blue-500"
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
        />

        <div className="flex gap-3">
          <button
            onClick={
              editingId
                ? updateNote
                : createNote
            }
            className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg font-semibold transition"
          >
            {editingId
              ? "Update Note"
              : "Create Note"}
          </button>

          {editingId && (
            <button
              onClick={() => {
                setEditingId(null);
                setTitle("");
                setContent("");
                setCategory("Other");
              }}
              className="bg-gray-600 hover:bg-gray-700 px-5 py-3 rounded-lg"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="🔍 Search notes..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600 outline-none focus:border-blue-500"
        />
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <select
          value={filterCategory}
          onChange={(e) =>
            setFilterCategory(
              e.target.value
            )
          }
          className="w-full p-3 rounded-lg bg-slate-700 text-white"
        >
          <option value="All">
            All Categories
          </option>
          <option value="DSA">DSA</option>
          <option value="DBMS">DBMS</option>
          <option value="OS">OS</option>
          <option value="CN">CN</option>
          <option value="Aptitude">
            Aptitude
          </option>
          <option value="Other">
            Other
          </option>
        </select>
      </div>

      {/* Notes List */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">
          Your Notes ({filteredNotes.length})
        </h2>

        {filteredNotes.length === 0 ? (
          <div className="bg-slate-800 p-8 rounded-xl text-center">
            <p className="text-slate-400">
              No notes found 🚀
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredNotes.map((note) => (
              <div
                key={note._id}
                className="bg-slate-800 p-5 rounded-xl border border-slate-700 hover:border-blue-500 transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-blue-400">
                      {note.title}
                    </h3>

                    <div className="flex gap-2 mt-2">
                      <span className="bg-blue-600 px-2 py-1 rounded text-xs">
                        {note.category ||
                          "Other"}
                      </span>

                      {note.isPinned && (
                        <span className="bg-yellow-500 text-black px-2 py-1 rounded text-xs">
                          📌 Pinned
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() =>
                        togglePin(note._id)
                      }
                      className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded text-sm"
                    >
                      {note.isPinned
                        ? "Unpin"
                        : "Pin"}
                    </button>

                    <button
                      onClick={() => {
                        setEditingId(note._id);
                        setTitle(note.title);
                        setContent(note.content);
                        setCategory(
                          note.category ||
                            "Other"
                        );

                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }}
                      className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm"
                    >
                      Edit
                    </button>

                    <button
  onClick={() =>
    deleteNote(note._id)
  }
  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
>
  Delete
</button>

<button
  onClick={() =>
    summarizeNote(note.content)
  }
  className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded text-sm"
>
  🤖 Summary
</button>
                  </div>
                </div>

                <p className="mt-3 text-slate-300 break-words">
                  {note.content}
                </p>

                <p className="mt-4 text-xs text-slate-500">
                  {new Date(
                    note.createdAt
                  ).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
            </div>

      {showSummary && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-slate-800 p-6 rounded-xl w-[90%] max-w-3xl max-h-[80vh] overflow-y-auto">

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-purple-400">
                🤖 AI Summary
              </h2>

              <button
                onClick={() => setShowSummary(false)}
                className="bg-red-600 px-3 py-1 rounded"
              >
                X
              </button>
            </div>

            {loadingSummary ? (
              <p>Generating Summary...</p>
            ) : (
              <pre className="whitespace-pre-wrap text-slate-200">
                {summary}
              </pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Notes;

