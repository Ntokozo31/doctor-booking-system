// Import getDb from db
const { getDb } = require('../config/db');

// Import validator
const validator = require('validator');

// Import bcrypt
const bcrypt = require('bcrypt');

// Register user and save to database
const register = async (req, res) => {
    try {
        // Extract username, email and password
        const { username, email, password } = req.body;
        // Validate the fields
        if (!username || !email || !password) {
            return res.status(400).send('OOPS all fields are required')
        }
        // Validate user email
        // If email is an invalid format we return statusCode of 400
        if (!validator.isEmail(email)) {
            return res.status(400).json({error: 'Sorry invalid email format'});
        }
        // Validate password
        // The password must be at least 6 characters
        if (!password || password.length < 6) {
            return res.status(400).json({error: 'Your password must be at least 6 characters long'});
        }
        // Hashing password before storing it in our db
        const hashingPassword = await bcrypt.hash(password, 10);

        const db = getDb();
        // Check if the user already exist
        // If the user exist we return statusCode of 400
        const existUser = await db.collection('users').findOne({email})
        if (existUser) {
            return res.status(400).send('OOPS sorry user with this email already exit');
        }
        // Add new user to database
        const newUser = { username, email, password: hashingPassword, createdAt: new Date()};
        await db.collection('users').insertOne(newUser);
        res.status(201).send({ message: `Congratulations ${username} your registraion was successful` });
    // Internal server error problem we return a statusCode of 500
    } catch (err) {
        console.error(err);
        res.status(500).send('Eish sorry an internal server error occurred');
    };
};

// User login
const userLogin = async (req, res) => {
    try {
        // Extract email and password in req.bod
        const { email, password } = req.body

        const db = getDb();

        // Find the user by email in our database
        const user = await db.collection('users').findOne({email});

        // If we dont if the user
        // We return statusCode of 404
        if (!user) {
            return res.status(404).json({ error: 'Sorry user not found'});
        }
        
        // Validate password
        // If the password is invalid we return statusCode of 401
        // Else if the password is valid, the user will login successfully
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Sorry invalid credentials'});
        }
        res.status(200).json({ message: 'Login successfull', user: { email: user.email, username: user.username}});
    } catch(err) {
        console.error(err);
        res.status(500).send('Eish sorry an internal server error occurred');
    }
};



// Exports register
module.exports = {
    register,
    userLogin
};