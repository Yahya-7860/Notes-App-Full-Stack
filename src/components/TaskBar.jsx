import React, { useRef, useState } from "react";
import "../CSS Folder/TaskBar.css";
import { useDispatch, useSelector } from "react-redux";
import { addNote } from "../slice/noteSlice";

function TaskBar() {
  const noteRef = useRef(null);
  const dispatch = useDispatch();
  const allNotes = useSelector((state) => state.note.notes);

  const hclick = (e) => {
    e.preventDefault();
    const note = noteRef.current.value;
    if (note !== "") {
      dispatch(addNote(note));
      const updatedNotes = [{ ...allNotes, note }];
      localStorage.setItem("AllNotesRedux", JSON.stringify(updatedNotes));
      noteRef.current.value = "";
    }
  };

  return (
    <>
      <div className="taskbar_container">
        <form onSubmit={hclick}>
          <input
            type="text"
            autoFocus
            placeholder="Take a note..."
            className="textbar"
            ref={noteRef}
          />
        </form>
        <button className="addbtn" onClick={hclick}>
          Add Note
        </button>
      </div>
    </>
  );
}

export default TaskBar;
