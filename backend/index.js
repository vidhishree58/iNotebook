require("dotenv").config();
// Import our custom function from db.js to connect backend with MongoDB
const connectToMongo = require('./db');

// Import Express framework from node_modules
const express = require('express');

// Import CORS middleware to allow frontend (port 3000) to communicate with backend (port 5000)
const cors = require('cors');

// Establish connection with MongoDB
// This only creates a connection, it does NOT store any data.
connectToMongo();

// Create an Express application
// 'app' represents our backend server.
const app = express();

// Backend will run on port 5000
const port = process.env.PORT || 5000;

// =======================
// Middleware
// =======================

// Allow requests from different origins (Frontend -> Backend)
app.use(cors());

// Convert incoming JSON data into JavaScript object
// Without this, req.body will be undefined.
app.use(express.json());

// =======================
// Routes
// =======================

// If request starts with /api/auth,
// send it to routes/auth.js
app.use('/api/auth', require('./routes/auth'));

// If request starts with /api/notes,
// send it to routes/notes.js
app.use('/api/notes', require('./routes/notes'));

// =======================
// Start Server
// =======================

// Start backend and listen for incoming requests on port 5000
app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`);
});