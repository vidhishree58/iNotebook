// Import React library
import React from 'react';

// Import Notes component (displays all notes)
import Notes from './Notes';

// Import AddNote component (used to add a new note)
import AddNote from './AddNote';

// Home component
const Home = () => {

  return (

    // Bootstrap container for spacing
    <div className="container">

      {/* Form to add a new note */}
      <AddNote />

      {/* Display all notes */}
      <Notes />

    </div>

  );
};

// Export Home component
export default Home;