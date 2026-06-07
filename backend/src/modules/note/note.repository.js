const Note = require("./note.model");

const createNote = async (data) => {
  return await Note.create(data);
};

const getNotesByUser = async (userId) => {
  return await Note.find({
    user: userId,
  }).sort({
    isPinned: -1,
    createdAt: -1,
  });
};

const getNoteById = async (id) => {
  return await Note.findById(id);
};

const updateNote = async (
  id,
  data
) => {
  return await Note.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
    }
  );
};

const togglePin = async (id) => {
  const note =
    await Note.findById(id);

  if (!note) {
    throw new Error(
      "Note not found"
    );
  }

  note.isPinned =
    !note.isPinned;

  await note.save();

  return note;
};

const deleteNote = async (id) => {
  return await Note.findByIdAndDelete(
    id
  );
};

module.exports = {
  createNote,
  getNotesByUser,
  getNoteById,
  updateNote,
  togglePin,
  deleteNote,
};