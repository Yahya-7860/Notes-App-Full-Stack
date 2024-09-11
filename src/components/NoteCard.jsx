import React, { useEffect } from "react";
import "../CSS Folder/NoteCard.css";
import "../CSS Folder/TaskBar.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote } from "../slice/noteSlice";

function NoteCard({ id, text }) {
  const dispatch = useDispatch();
  const allnotes = useSelector((state) => state.note.notes);

  const hclick = () => {
    dispatch(deleteNote(id));
    const updatedNotes = allnotes.filter((note) => note.id !== id);
    localStorage.setItem("AllNotesRedux", JSON.stringify(updatedNotes));
  };

  // useEffect(() => {
  //   localStorage.setItem("AllNotesRedux", JSON.stringify(allnotes));
  // }, [allnotes]);

  return (
    <div className="cardTextContainer">
      <p className="cardText">
        {text}
        <br />
        <br />
        <i className="fa-solid fa-trash addbtn" onClick={hclick}></i>
      </p>
    </div>
  );
}

export default NoteCard;
