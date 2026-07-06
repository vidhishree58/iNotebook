import React from "react";

const About = () => {
  return (
    <div className="container mt-4">
      <h2>About iNotebook</h2>
      <hr />

      <p>
        <strong>iNotebook</strong> is a secure note-taking application built
        using the MERN Stack. It allows users to create, edit, and delete their
        personal notes after logging into their account.
      </p>

      <h4>Features</h4>

      <ul>
        <li>🔐 User Authentication (Login & Signup)</li>
        <li>📝 Create Notes</li>
        <li>✏️ Edit Existing Notes</li>
        <li>🗑️ Delete Notes</li>
        <li>💾 Notes Stored Securely in MongoDB</li>
        <li>🔒 JWT Protected Routes</li>
        <li>📱 Responsive User Interface</li>
      </ul>

      <h4>Technologies Used</h4>

      <ul>
        <li>React.js</li>
        <li>Node.js</li>
        <li>Express.js</li>
        <li>MongoDB</li>
        <li>Mongoose</li>
        <li>Bootstrap 5</li>
        <li>JWT Authentication</li>
      </ul>
    </div>
  );
};

export default About;