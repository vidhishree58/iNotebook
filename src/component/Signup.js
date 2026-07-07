import React, { useState } from "react";

// Import hooks for navigation and alert
import { useNavigate, useOutletContext } from "react-router-dom";

const Signup = () => {
  console.log(process.env.HOST)
  // Store form data
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: ""
  });

  // Used to change page
  const navigate = useNavigate();

  // Get showAlert() from App.js
  const { showAlert } = useOutletContext();

  // Runs when Sign Up button is clicked
  const handleSubmit = async (e) => {

    // Prevent page refresh
    e.preventDefault();
    
    // Send user details to backend
    const response = await fetch(`${process.env.REACT_APP_HOST}/api/auth`, {

      // POST = Create new user
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      // Send user data
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password
      })
    });

    // Convert response into JS object
    const json = await response.json();

    // If account created successfully
    if (json.success) {

      // Save JWT token
      localStorage.setItem("token", json.authToken);

      // Show success alert
      showAlert("Account Created Successfully", "success");

      // Go to Home page
      navigate("/");

    } else {

      // Email already exists
      showAlert("Email already exists", "danger");
    }
  };

  // Update form values while typing
  const onChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container mt-3">

      <h2>Create an Account</h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>

          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={credentials.name}
            onChange={onChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
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
          Sign Up
        </button>

      </form>

    </div>
  );
};

export default Signup;