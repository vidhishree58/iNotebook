// Import React hooks
import React, { useState, useContext } from "react";

// Import Context API
import noteContext from "../context/notes/noteContext";

const AddNote = () => {

  // Access Context
  const context = useContext(noteContext);

  // Get addNote function
  const { addNote } = context;

  // Store form data
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  // Runs when Add Note button is clicked
  const handleClick = (e) => {

    // Prevent page refresh
    e.preventDefault();

    // Send data to backend
    addNote(note.title, note.description, note.tag);

    // Clear input fields
    setNote({
      title: "",
      description: "",
      tag: "",
    });
  };

  // Runs whenever user types
  const onChange = (e) => {

    // Update state
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <h2>Add a Note</h2>

      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>

          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            onChange={onChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>

          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            onChange={onChange}
          />
        </div>

        <div className="mb-3"></div>

        <button
          disabled={note.title.length < 5 || note.description.length < 5}
          type="submit"
          className="btn btn-primary"
          onClick={handleClick}
        >
          Add Note
        </button>
      </form>
    </>
  );
};

export default AddNote;
