// Import React and useState hook
import React, { useState } from "react";

// Import Context
import NoteContext from "./noteContext";

// Provider Component
const NoteState = (props) => {
  // Receive showAlert function from App.js
  const { showAlert } = props;

  // Backend Server Address
  const host = "http://localhost:5000";

  // Store all notes
  const [notes, setNotes] = useState([]);

  // Get All Notes
  const getNotes = async () => {
    // Backend API ko request bhejo
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      // GET = data lena
      method: "GET",

      // Request headers
      headers: {
        "Content-Type": "application/json",

        // Logged-in user ka token bhejo
        "auth-token": localStorage.getItem("token"),
      },
    });

    // Response ko JSON me convert karo
    const json = await response.json();

    // React state me notes store karo
    setNotes(json);
  };

  // Add Note
  const addNote = async (title, description, tag) => {
    // Backend API ko request bhejo
    const response = await fetch(`${host}/api/notes/addnote`, {
      // POST = Naya Data Bhejna
      method: "POST",

      // Request headers
      headers: {
        "Content-Type": "application/json",

        // Logged-in user ka token
        "auth-token": localStorage.getItem("token"),
      },

      // Data ko JSON format me backend ko bhejo
      body: JSON.stringify({
        title,
        description,
        tag,
      }),
    });

    // Backend se saved note lo
    const note = await response.json();

    // React state me new note add karo
    setNotes(notes.concat(note));

    // Success alert dikhao
    showAlert("Note Added Successfully", "success");
  };

  // Delete Note
  const deleteNote = async (id) => {
    // Send DELETE request to backend
    await fetch(`${host}/api/notes/deletenote/${id}`, {
      // DELETE = Remove Data
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",

        // Send logged-in user's token
        "auth-token": localStorage.getItem("token"),
      },
    });

    // Remove deleted note from React State
    const newNotes = notes.filter((note) => note._id !== id);

    // Update state
    setNotes(newNotes);

    // Show success message
    showAlert("Note Deleted Successfully", "success");
  };

  // Edit Note
  const editNote = async (id, title, description, tag) => {
    await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title,
        description,
        tag,
      }),
    });

    let newNotes = JSON.parse(JSON.stringify(notes));

    for (let i = 0; i < newNotes.length; i++) {
      if (newNotes[i]._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;

        break;
      }
    }

    setNotes(newNotes);
    showAlert("Note Updated Successfully", "success");
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        getNotes,
        addNote,
        deleteNote,
        editNote,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
