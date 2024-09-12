import React, { useRef, useState } from "react";
import "../CSS Folder/TaskBar.css";
import { useDispatch, useSelector } from "react-redux";
import { addNote } from "../slice/noteSlice";
import { useNavigate } from "react-router-dom";

function TaskBar() {
  const noteRef = useRef(null);
  const dispatch = useDispatch();
  const allNotes = useSelector((state) => state.note.notes);
  const navigate = useNavigate();

  const hclick = (e) => {
    e.preventDefault();
    const content = noteRef.current.value;
    if (content !== "") {
      dispatch(addNote(content));
      noteRef.current.value = "";
      const userId = localStorage.getItem("userId");
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ content, userId }),
      };

      fetch(`http://localhost:8000/note/add`, options)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          if (data.Error === "Invalid token or session Expired, Login Again") {
            navigate("/login");
          }
        });
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
