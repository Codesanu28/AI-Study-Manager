const express = require("express");

const protect = require(
  "../../middleware/auth.middleware"
);

const noteController =
  require("./note.controller");

const router = express.Router();

router.post(
  "/",
  protect,
  noteController.createNote
);

router.get(
  "/",
  protect,
  noteController.getNotes
);

router.put(
  "/:id",
  protect,
  noteController.updateNote
);

router.patch(
  "/:id/pin",
  protect,
  noteController.togglePin
);

router.delete(
  "/:id",
  protect,
  noteController.deleteNote
);

module.exports = router;