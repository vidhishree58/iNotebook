// Import Express
const express = require('express');

// Create Router
const router = express.Router();

// Import middleware to verify logged-in user
const fetchuser = require('../middleware/fetchUser');

// Import Note Model
const Note = require('../models/Notes');


// ==========================================================
// GET ALL NOTES
// URL : GET /api/notes/fetchallnotes
// Purpose : Get all notes of logged-in user
// ==========================================================
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {

        // Find only those notes whose user id
        // matches logged-in user's id
        const notes = await Note.find({
            user: req.user.id
        });

        // Send notes to frontend
        res.json(notes);

    } catch (error) {

        console.error(error);

        res.status(500).send("Server Error");
    }
});


// ==========================================================
// ADD NOTE
// URL : POST /api/notes/addnote
// Purpose : Add new note for logged-in user
// ==========================================================
router.post('/addnote', fetchuser, async (req, res) => {

    try {

        // Read note data from frontend
        const { title, description, tag } = req.body;

        // Create Note object
        const note = new Note({

            // Save logged-in user's id
            user: req.user.id,

            title,
            description,
            tag
        });

        // Save note in MongoDB
        const savedNote = await note.save();

        // Send saved note back
        res.json(savedNote);

    } catch (error) {

        console.error(error);

        res.status(500).send("Server Error");
    }
});


// ==========================================================
// UPDATE NOTE
// URL : PUT /api/notes/updatenote/:id
// Purpose : Update an existing note
// ==========================================================
router.put('/updatenote/:id', fetchuser, async (req, res) => {

    try {

        // Read updated values
        const { title, description, tag } = req.body;

        // Create object to store updated fields
        const newNote = {};

        if (title)
            newNote.title = title;

        if (description)
            newNote.description = description;

        if (tag)
            newNote.tag = tag;

        // Find note using id from URL
        let note = await Note.findById(req.params.id);

        // If note doesn't exist
        if (!note) {
            return res.status(404).send("Note not found");
        }

        // Security Check:
        // Only owner can update the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        // Update note
        note = await Note.findByIdAndUpdate(

            req.params.id,

            {
                $set: newNote
            },

            {
                new: true
            }

        );

        // Send updated note
        res.json(note);

    } catch (error) {

        console.error(error);

        res.status(500).send("Server Error");
    }
});


// ==========================================================
// DELETE NOTE
// URL : DELETE /api/notes/deletenote/:id
// Purpose : Delete note
// ==========================================================
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {

        // Read note id from URL
        const noteId = req.params.id;

        // Find note
        let note = await Note.findById(noteId);

        // If note doesn't exist
        if (!note) {
            return res.status(404).send("Note not found");
        }

        // Security Check:
        // Only owner can delete
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        // Delete note
        note = await Note.findByIdAndDelete(noteId);

        // Send success response
        res.json({

            success: true,

            message: "Note has been deleted",

            note

        });

    } catch (error) {

        console.error(error);

        res.status(500).send("Server Error");
    }
});

// Export Router
module.exports = router;