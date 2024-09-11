const notesRouter = require("express").Router();
const { jwtAuth } = require("../middleware");
const {
  handleAddNote,
  handleGetNotes,
  handleDeleteNote,
  handleUpdateNote,
} = require("../controller");

notesRouter.get("/get", handleGetNotes);
notesRouter.post("/add", handleAddNote);
notesRouter.put("/update/:id", handleUpdateNote);
notesRouter.delete("/delete/:id", handleDeleteNote);

module.exports = {
  notesRouter,
};
