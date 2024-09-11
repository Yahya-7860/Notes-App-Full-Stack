import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: [{}],
};

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.notes.push({ id: new Date().getTime(), text: action.payload });
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter((note) => note.id != action.payload);
    },
    replaceAllNotes: (state, action) => {
      state.notes.push(action.payload);
    },
  },
});

export const { addNote, deleteNote, replaceAllNotes } = noteSlice.actions;
export default noteSlice.reducer;
