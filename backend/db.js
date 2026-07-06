// Import Mongoose package (Bridge between Node.js and MongoDB)
const mongoose = require('mongoose');

// MongoDB connection URL
const mongoURI = process.env.MONGO_URI;

// Custom function to connect backend with MongoDB
const connectToMongo = async () => {

    try {

        // Wait until MongoDB connection is established
        await mongoose.connect(mongoURI);

        // Print success message in terminal
        console.log("Connected");

    } catch (error) {

        // Print error if MongoDB connection fails
        console.error("MongoDB connection failed:", error);
    }
};

// Export this function so index.js can use it
module.exports = connectToMongo;