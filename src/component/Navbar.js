// Import React
import React from "react";

// Import routing hooks and Link component
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {

  // Get current URL
  const location = useLocation();

  // Used to navigate programmatically
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {

    // Remove JWT token from browser
    localStorage.removeItem("token");

    // Redirect user to Login page
    navigate("/login");
  };

  return (

    // Bootstrap Navbar
    <nav className="navbar navbar-expand-lg bg-body-tertiary">

      <div className="container-fluid">

        {/* Website Logo */}
        <Link className="navbar-brand" to="/">
          iNotebook
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">

          {/* Navigation Links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            {/* Home Link */}
            <li className="nav-item">

              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                to="/"
              >
                Home
              </Link>

            </li>

            {/* About Link */}
            <li className="nav-item">

              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>

            </li>

          </ul>

          {/* If user is NOT logged in */}
          {!localStorage.getItem("token") ? (

            <>

              {/* Login Button */}
              <Link className="btn btn-primary mx-1" to="/login">
                Login
              </Link>

              {/* Signup Button */}
              <Link className="btn btn-success mx-1" to="/signup">
                Signup
              </Link>

            </>

          ) : (

            // If logged in
            <button
              onClick={handleLogout}
              className="btn btn-danger"
            >
              Logout
            </button>

          )}

        </div>

      </div>

    </nav>

  );
};

// Export Navbar component
export default Navbar;