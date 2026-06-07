const noteRepository =
  require("./note.repository");

const createNote = async (
  userId,
  data
) => {
  return await noteRepository.createNote({
    ...data,
    user: userId,
  });
};

const getNotes = async (userId) => {
  return await noteRepository.getNotesByUser(
    userId
  );
};

const updateNote = async (
  noteId,
  userId,
  data
) => {
  const note =
    await noteRepository.getNoteById(
      noteId
    );

  if (!note) {
    throw new Error(
      "Note not found"
    );
  }

  if (
    note.user.toString() !== userId
  ) {
    throw new Error(
      "Unauthorized"
    );
  }

  return await noteRepository.updateNote(
    noteId,
    data
  );
};

const togglePin = async (
  noteId,
  userId
) => {
  const note =
    await noteRepository.getNoteById(
      noteId
    );

  if (!note) {
    throw new Error(
      "Note not found"
    );
  }

  if (
    note.user.toString() !== userId
  ) {
    throw new Error(
      "Unauthorized"
    );
  }

  return await noteRepository.togglePin(
    noteId
  );
};

const deleteNote = async (
  noteId,
  userId
) => {
  const note =
    await noteRepository.getNoteById(
      noteId
    );

  if (!note) {
    throw new Error(
      "Note not found"
    );
  }

  if (
    note.user.toString() !== userId
  ) {
    throw new Error(
      "Not authorized to delete this note"
    );
  }

  return await noteRepository.deleteNote(
    noteId
  );
};

module.exports = {
  createNote,
  getNotes,
  updateNote,
  togglePin,
  deleteNote,
};