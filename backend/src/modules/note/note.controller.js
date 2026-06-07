const noteService = require("./note.service");

const createNote = async (req, res) => {
  try {
    const note = await noteService.createNote(
      req.user.id,
      req.body
    );

    return res.status(201).json({
      success: true,
      note,
    });
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getNotes = async (req, res) => {
  try {
    const notes = await noteService.getNotes(
      req.user.id
    );

    return res.status(200).json({
      success: true,
      notes,
    });
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateNote = async (req, res) => {
  try {
    const note = await noteService.updateNote(
      req.params.id,
      req.user.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      note,
    });
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const togglePin = async (req, res) => {
  try {
    const note =
      await noteService.togglePin(
        req.params.id,
        req.user.id
      );

    return res.status(200).json({
      success: true,
      note,
    });
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteNote = async (req, res) => {
  try {
    await noteService.deleteNote(
      req.params.id,
      req.user.id
    );

    return res.status(200).json({
      success: true,
      message:
        "Note deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createNote,
  getNotes,
  updateNote,
  togglePin,
  deleteNote,
};