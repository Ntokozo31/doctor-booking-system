const jwt = require('jsonwebtoken');

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const authenticateUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.status(401).json({ message: 'No token provided, Please login and try agian' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();    
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token'})
    }
};

module.exports = authenticateUser;