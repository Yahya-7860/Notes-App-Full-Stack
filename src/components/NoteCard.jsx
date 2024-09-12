import React, { useEffect } from "react";
import "../CSS Folder/NoteCard.css";
// import "../CSS Folder/TaskBar.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote } from "../slice/noteSlice";

function NoteCard({ id, content, setNotes }) {
  const dispatch = useDispatch();
  const allnotes = useSelector((state) => state.note.notes);

  const hclick = () => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ id }),
    };
    const options2 = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    fetch("http://localhost:8000/note/delete", options)
      .then((res) => res.json())
      .then((data) => {
        dispatch(deleteNote(id));
        return fetch("http://localhost:8000/note/get", options2)
          .then((res) => res.json())
          .then((data) => {
            setNotes(data);
          });
      });
  };

  return (
    <div className="cardTextContainer">
      <p className="cardText">
        {content}
        <br />
        <br />
        <i className="fa-solid fa-trash addbtn" onClick={hclick}></i>
      </p>
    </div>
  );
}

export default NoteCard;
