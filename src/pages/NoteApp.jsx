import React, { useEffect } from "react";
import "../App.css";
import NoteCard from "../components/NoteCard";
import TaskBar from "../components/TaskBar";
import { useDispatch, useSelector } from "react-redux";
import { replaceAllNotes } from "../slice/noteSlice";

function NoteApp() {
  const notes = useSelector((state) => state.note.notes);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const storedData = JSON.parse(localStorage.getItem("AllNotesRedux"));
  //   if (storedData) {
  //     try {
  //       const parsedData = JSON.parse(storedData);
  //       dispatch(replaceAllNotes(parsedData));
  //     } catch (error) {
  //       console.error("Error parsing stored data", error);
  //     }
  //   }
  // }, []);

  return (
    <div>
      <div className="main_app_container">
        <h2>Notes App</h2>
        <div className="app_container">
          <TaskBar />
          <div className="noteCardGrid">
            {notes.length > 0 ? (
              notes
                .slice(0)
                .reverse()
                .map((OneNote) => (
                  <NoteCard
                    key={OneNote.id}
                    id={OneNote.id}
                    text={OneNote.text}
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
