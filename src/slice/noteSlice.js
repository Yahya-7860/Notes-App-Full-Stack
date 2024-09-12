import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: [],
};

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.notes.push({ id: new Date().getTime(), content: action.payload });
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter((note) => note.id != action.payload);
    },
    replaceAllNotes: (state, action) => {
      state.notes.push(action.payload);
    },
    clearRedux: (state, action) => {
      state.notes = [];
    },
  },
});

export const { addNote, deleteNote, replaceAllNotes, clearRedux } =
  noteSlice.actions;
export default noteSlice.reducer;
