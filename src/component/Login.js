import React, { useState } from "react";

// Import hooks from React Router
import { useNavigate, useOutletContext } from "react-router-dom";

const Login = () => {
  // Store email & password entered by user
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  // Used to change page after login
  const navigate = useNavigate();

  // Receive showAlert() from Layout (App.js)
  const { showAlert } = useOutletContext();

  // Run when Login button is clicked
  const handleSubmit = async (e) => {
    // Prevent page refresh
    e.preventDefault();

    // Send login request to backend
    const response = await fetch(`${process.env.REACT_APP_HOST}/api/auth/login`, {
      // POST = send data
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      // Send email & password
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    // Convert response to JS object
    const json = await response.json();

    // If login successful
    if (json.success) {
      // Save JWT token
      localStorage.setItem("token", json.authToken);

      // Show success message
      showAlert("Logged in Successfully", "success");

      // Go to Home page
      navigate("/");
    } else {
      // Wrong email/password
      showAlert("Invalid Credentials", "danger");
    }
  };

  // Update input values while typing
  const onChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container mt-3">
      <h2 className="mb-3">Login to Continue</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>

          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            onChange={onChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>

          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
