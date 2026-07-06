// Import React library and useState hook
import React, { useState } from "react";

// Import React Router functions
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

// Import Navbar component
import Navbar from "./component/Navbar";

// Import pages
import Home from "./component/Home";
import About from "./component/About";
import Login from "./component/Login";
import Signup from "./component/Signup";

// Import Context Provider (shares notes data with the whole app)
import NoteState from "./context/notes/NoteState";

// Import Alert component
import Alert from "./component/Alert";

function App() {

  // Store alert message
  const [alert, setAlert] = useState(null);

  // Function to show alert
  const showAlert = (message, type) => {

    // Set alert data
    setAlert({
      msg: message,
      type: type,
    });

    // Remove alert after 1.5 seconds
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  // Common layout shared by all pages
  function Layout() {
    return (
      <>
        {/* Navbar visible on every page */}
        <Navbar />

        {/* Alert visible on every page */}
        <Alert alert={alert} />

        {/* Child page will render here */}
        <Outlet context={{ showAlert }} />
      </>
    );
  }

  // Define all application routes
  const router = createBrowserRouter([
    {
      // Parent Route
      path: "/",

      // Layout for all child pages
      element: <Layout />,

      children: [

        // Home Page
        {
          index: true,
          element: <Home />,
        },

        // About Page
        {
          path: "about",
          element: <About />,
        },

        // Login Page
        {
          path: "login",
          element: <Login />,
        },

        // Signup Page
        {
          path: "signup",
          element: <Signup />,
        },
      ],
    },
  ]);

  return (

    // Provide Notes Context to the entire application
    <NoteState showAlert={showAlert}>

      {/* Enable routing */}
      <RouterProvider router={router} />

    </NoteState>
  );
}

// Export App component
export default App;