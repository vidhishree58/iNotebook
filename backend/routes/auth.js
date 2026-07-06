// Import Express framework
const express = require('express');

// Import User Model to interact with users collection in MongoDB
const User = require('../models/User');

// Import JWT package to create authentication tokens
const jwt = require('jsonwebtoken');

// Import bcrypt package to hash and compare passwords
const bcrypt = require('bcryptjs');

// Import custom middleware to verify logged-in user
const fetchuser = require('../middleware/fetchUser');

// Create Express Router
const router = express.Router();

// Secret key used to create and verify JWT tokens
const JWT_SECRET = process.env.JWT_SECRET;


// ==========================================================
// REGISTER USER
// URL : POST /api/auth
// Purpose : Create a new user account
// ==========================================================
router.post('/', async (req, res) => {

    try {

        // Get data sent from frontend
        const { name, email, password } = req.body;

        // Check if any required field is missing
        if (!name || !email || !password) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        // Generate a random salt for password hashing
        const salt = await bcrypt.genSalt(10);

        // Convert plain password into hashed password
        const secPassword = await bcrypt.hash(password, salt);

        // Create a new User object
        const user = new User({
            name,
            email,

            // Store hashed password instead of original password
            password: secPassword,

            // Save current date
            date: new Date()
        });

        // Save user in MongoDB
        await user.save();

        // Create JWT Token containing only user ID
        const authToken = jwt.sign(
            { user: { id: user.id } },
            JWT_SECRET
        );

        // Send token back to frontend
        res.json({
            success: true,
            authToken
        });

    } catch (error) {

        // Duplicate Email Error
        if (error.code === 11000) {
            return res.status(400).json({
                error: "Email already exists"
            });
        }

        // Print error in terminal
        console.error(error);

        // Internal Server Error
        res.status(500).json({
            error: "Server Error"
        });
    }
});


// ==========================================================
// LOGIN USER
// URL : POST /api/auth/login
// Purpose : Verify user and return JWT Token
// ==========================================================
router.post('/login', async (req, res) => {

    try {

        // Get login credentials from frontend
        const { email, password } = req.body;

        // Check if email/password is missing
        if (!email || !password) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        // Search user by email
        const user = await User.findOne({ email });

        // If email doesn't exist
        if (!user) {
            return res.status(400).json({
                error: "Invalid credentials"
            });
        }

        // Compare entered password with hashed password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        // Password is incorrect
        if (!isMatch) {
            return res.status(400).json({
                error: "Invalid credentials"
            });
        }

        // Create new JWT Token after successful login
        const authToken = jwt.sign(
            { user: { id: user.id } },
            JWT_SECRET
        );

        // Send token to frontend
        res.json({
            success: true,
            authToken
        });

    } catch (error) {

        // Print error
        console.error(error);

        // Internal Server Error
        res.status(500).json({
            error: "Server Error"
        });
    }
});


// ==========================================================
// GET LOGGED-IN USER
// URL : GET /api/auth/getuser
// Purpose : Return current logged-in user's details
// ==========================================================
router.get('/getuser', fetchuser, async (req, res) => {

    try {

        // Get logged-in user's ID from middleware
        const userId = req.user.id;

        // Find user using ID
        // Exclude password from response
        const user = await User.findById(userId).select("-password");

        // Send user data to frontend
        res.json(user);

    } catch (error) {

        // Print error
        console.error(error);

        // Internal Server Error
        res.status(500).send("Server Error");
    }
});

// Export router so index.js can use these routes
module.exports = router;