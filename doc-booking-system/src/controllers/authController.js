// Import getDb from db
const { getDb } = require('../config/db');

// Register user and save to database
const register = async (req, res) => {
    try {
        // Extract username, email and password
        const { username, email, password } = req.body;
        // Validate the fields
        if (!username || !email || !password) {
            return res.status(400).send('OOPS all fields are required')
        }
        const db = getDb();
        // Check if the user already exist
        // If the user exist we return statusCode of 400
        const existUser = await db.collection('users').findOne({email})
        if (existUser) {
            return res.status(400).send('OOPS sorry user with this email already exit');
        }
        // Add new user to database
        const newUser = { username, email, password}
        await db.collection('users').insertOne(newUser);
        res.status(201).send({ message: `Congratulations ${username} your registraion was successful` });
    // Internal server error problem we return a statusCode of 500
    } catch (err) {
        console.error(err);
        res.status(500).send('Eish sorry an internal error server occurred');
    };
};

// Exports register
module.exports = { register };