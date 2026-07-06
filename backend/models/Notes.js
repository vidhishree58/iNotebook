// Import Mongoose package
const mongoose = require('mongoose');

// Create a Schema (Blueprint/Structure) for every Note document
const NotesSchema = new mongoose.Schema({

    // Store the ID of the user who owns this note
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    // Title is required and must be a string
    title: {
        type: String,
        required: true
    },

    // Description is required
    description: {
        type: String,
        required: true
    },

    // If user doesn't provide a tag,
    // MongoDB will automatically use "General"
    tag: {
        type: String,
        default: "General"
    },

    // Automatically save current date/time
    // when the note is created
    date: {
        type: Date,
        default: Date.now
    }
});

// Create a Model named "note"
// This model is used to perform database operations
module.exports = mongoose.model('note', NotesSchema);