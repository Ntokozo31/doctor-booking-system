// Import jsonwebtoken
const jwt = require('jsonwebtoken');

// Import dotenv to manage environment variables
require('dotenv').config();

// Initialize JWT_SECRET from environment variables
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to authenticate user using JWT
const authenticateUser = (req, res, next) => {
    const token = req.cookies.token;
    // Check if token is provided
    // If no token is provided we return a statusCode of 401
    if(!token) {
        return res.status(401).json({ message: 'No token provided, Please login and try agian' });
    }
    try {
        // Verify the token using jwt.verify
        // If token is invalid or expired, jwt.verify will throw an error
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();    
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token'})
    }
};

// Module exports the authenticateUser middleware
module.exports = authenticateUser;