// Import Mongoose package
const mongoose = require('mongoose');

// Extract Schema from mongoose
// Instead of writing mongoose.Schema every time,
// we can simply write Schema.
const { Schema } = mongoose;

// Create User Schema (Blueprint for every User document)
const UserSchema = new Schema({

  // User's name
  name: {
    type: String,
    required: true,      // Name is mandatory
    minlength: 3,        // Minimum 3 characters
    trim: true           // Remove extra spaces from beginning and end
  },

  // User's email
  email: {
    type: String,
    required: true,      // Email is mandatory
    unique: true,        // No two users can have the same email
    trim: true
  },

  // User's password
  password: {
    type: String,
    required: true,       // Password is mandatory
    minlength: 6          // Minimum lenght is 6
  },

  // Automatically save account creation date
  date: {
    type: Date,
    default: Date.now
  }
});

// Create User Model using UserSchema
module.exports = mongoose.model('User', UserSchema);