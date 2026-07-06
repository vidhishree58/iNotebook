// Import React hooks
import React, { useContext, useEffect, useRef, useState } from "react";

// Used to change page using JavaScript
import { useNavigate } from "react-router-dom";

// Import Notes Context
import noteContext from "../context/notes/noteContext";

// Import component to display a single note
import NoteItem from "./NoteItem";

const Notes = () => {
  // Access data from Context API
  const context = useContext(noteContext);

  // Get notes array and functions from Context
  const { notes, getNotes, editNote } = context;

  // Used for redirecting to another page
  const navigate = useNavigate();

  // Runs automatically when component loads
  useEffect(() => {
    // Check if user is logged in
    if (localStorage.getItem("token")) {
      // Fetch all notes from backend
      getNotes();
    } else {
      // Redirect to Login page
      navigate("/login");
    }

    // Run only once when component loads
    // eslint-disable-next-line
  }, []);

  // Reference to the hidden button (used to open modal)
  const ref = useRef(null);

  // Reference to the Close button (used to close modal)
  const refClose = useRef(null);

  // Store editable note data
  const [note, setNote] = useState({
    // Store Note ID
    id: "",

    // Editable title
    etitle: "",

    // Editable description
    edescription: "",

    // Editable tag
    etag: "",
  });

  // Runs when user clicks Edit button
  const updateNote = (currentNote) => {
    // Click hidden button to open Bootstrap modal
    ref.current.click();

    // Store selected note data into state
    setNote({
      id: currentNote._id,

      etitle: currentNote.title,

      edescription: currentNote.description,

      etag: currentNote.tag,
    });
  };

 // Runs when Update Note button is clicked
const handleClick = (e) => {

  // Prevent page refresh
  e.preventDefault();

  // Call Context function to update note in backend
  editNote(
    note.id,
    note.etitle,
    note.edescription,
    note.etag
  );

  // Close Bootstrap modal
  refClose.current.click();
};

// Runs whenever user types in an input field
const onChange = (e) => {

  // Update only the changed field
  setNote({

    // Keep previous values
    ...note,

    // Update current input
    [e.target.name]: e.target.value,

  });
};

  return (
    <>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Note</h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Title</label>

                <input
                  type="text"
                  className="form-control"
                  name="etitle"
                  value={note.etitle}
                  onChange={onChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>

                <input
                  type="text"
                  className="form-control"
                  name="edescription"
                  value={note.edescription}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>

              <button
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 5
                }
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <h3>Your Notes</h3>

        <div className="row">
          {notes.map((note) => (
            <NoteItem key={note._id} note={note} updateNote={updateNote} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Notes;
