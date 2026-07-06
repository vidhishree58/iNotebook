// Import React and useContext hook
import React, { useContext } from "react";

// Import Context API
import noteContext from "../context/notes/noteContext";

// Receive data from parent component (Notes.js)
const NoteItem = (props) => {

  // Access Context
  const context = useContext(noteContext);

  // Get delete function from Context
  const { deleteNote } = context;

  // Get note object and update function from props
  const { note, updateNote } = props;

  return (

    // Bootstrap column
    <div className="col-md-6">

      {/* Bootstrap Card */}
      <div className="card my-3">

        <div className="card-body">

          {/* Title + Icons */}
          <div className="d-flex align-items-center justify-content-between">

            {/* Note Title */}
            <h5 className="card-title">
              {note.title}
            </h5>

            <div>

              {/* Delete Icon */}
              <i
                className="fa-solid fa-trash mx-2"

                // Delete selected note
                onClick={() => deleteNote(note._id)}
              ></i>

              {/* Edit Icon */}
              <i
                className="fa-solid fa-pen-to-square mx-2"

                // Open Edit Modal
                onClick={() => updateNote(note)}
              ></i>

            </div>

          </div>

          {/* Note Description */}
          <p className="card-text">
            {note.description}
          </p>

        </div>

      </div>

    </div>

  );
};

// Export component
export default NoteItem;