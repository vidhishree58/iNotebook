// Import JWT package
const jwt = require("jsonwebtoken");

// Secret key used while creating and verifying JWT
const JWT_SECRET = process.env.JWT_SECRET;

// Custom middleware
const fetchuser = (req, res, next) => {

    // Get token from request header
    const token = req.header("auth-token");

    // If token is missing, stop request
    if (!token) {
        return res.status(401).send("No token, access denied");
    }

    try {

        // Verify token using secret key
        const data = jwt.verify(token, JWT_SECRET);

        // Store user information inside req object
        req.user = data.user;

        // Continue to next middleware or route
        next();

    } catch (error) {

        console.log(error);

        // Token is invalid
        return res.status(401).send("Invalid token");
    }
};

// Export middleware
module.exports = fetchuser;