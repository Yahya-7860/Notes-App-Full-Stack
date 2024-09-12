import React, { useEffect, useState } from "react";
import "../App.css";
import NoteCard from "../components/NoteCard";
import TaskBar from "../components/TaskBar";
import Navbar from "../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { clearRedux } from "../slice/noteSlice";

function NoteApp() {
  const [notes, setNotes] = useState([]);
  const dispatch = useDispatch();
  const reduxNotes = useSelector((state) => state.note.notes);
  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  useEffect(() => {
    fetch("http://localhost:8000/note/get", options)
      .then((res) => res.json())
      .then((data) => {
        setNotes(data);
      });
  }, []);

  useEffect(() => {
    if (reduxNotes.length > 0) {
      setNotes((pre) =>
        Array.isArray(pre) ? [...pre, ...reduxNotes] : [...reduxNotes]
      );
      dispatch(clearRedux());
    }
  }, [reduxNotes]);

  return (
    <div>
      <Navbar />
      <div className="main_app_container">
        <div className="app_container">
          <TaskBar />
          <div className="noteCardGrid">
            {notes.length > 0 ? (
              notes
                .slice(0)
                .reverse()
                .map((OneNote) => (
                  <NoteCard
                    key={OneNote._id}
                    id={OneNote._id}
                    content={OneNote.content}
                    setNotes={setNotes} //new
                  />
                ))
            ) : (
              <p>No Notes Available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteApp;
