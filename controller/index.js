const {
  handleAddNote,
  handleGetNotes,
  handleDeleteNote,
  handleUpdateNote,
} = require("./notesController");

const { handleUserRegister } = require("./userController");

module.exports = {
  handleAddNote,
  handleGetNotes,
  handleDeleteNote,
  handleUpdateNote,
  handleUserRegister,
};
