// Import getDb from db
const { getDb } = require('../config/db');

// Import validator
const validator = require('validator');

// Import bcrypt
const bcrypt = require('bcrypt');

// Import jwt
const jwt = require('jsonwebtoken');

const { ObjectId } = require('mongodb');

// Import JWT_SECRET
require('dotenv').config();

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
            return res.status(400).json({ message: 'Sorry invalid email format'});
        }
        // Validate password
        // The password must be at least 6 characters
        if (!password || password.length < 6) {
            return res.status(400).json({ message: 'Your password must be at least 6 characters long'});
        }
        // Hashing password before storing it in our db
        const hashingPassword = await bcrypt.hash(password, 10);

        const db = getDb();
        // Check if the user already exist
        // If the user exist we return statusCode of 400
        const existUser = await db.collection('users').findOne({email})
        if (existUser) {
            return res.status(400).json({ message: 'OOPS sorry user with this email already exit' });
        }
        // Add new user to database
        const newUser = { username, email, password: hashingPassword, createdAt: new Date()};
        await db.collection('users').insertOne(newUser);
        res.status(201).json({ message: `Congratulations ${username} registraion was successful` });
    // Internal server error problem we return a statusCode of 500
    } catch (err) {
        console.error(err);
        res.status(500).send('Eish sorry an internal server error occurred');
    };
};

// Initialize jwt secret
const JWT_SECRET = process.env.JWT_SECRET;

// User login
const userLogin = async (req, res) => {
    try {
        // Extract email and password in req.bod
        const { email, password } = req.body

        // Initialize db
        const db = getDb();

        // Find the user by email in our database
        const user = await db.collection('users').findOne({email});

        // If we dont if the user
        // We return statusCode of 404
        if (!user) {
            return res.status(404).json({ message: 'Sorry user not found'});
        }
        
        // Validate password
        // If the password is invalid we return statusCode of 401
        // Else if the password is valid, the user will login successfully
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid email or password'});
        }

        // Genarate jwt token
        // We include userId, username and email in the token
        // Set the token to expire in 1 hour
        const userToken = jwt.sign(
            { userId: user._id },
            JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        )

        // Set the token in a cookie
        // The token will be stored in a cookie
        // The cookie will be httpOnly
        // The cookie will not be secure for now since we are on development
        // The cookie will have to expire in 1 hour
        // Set sameSite to Strict
        // StatusCode of 200 after storing the token in a cookie, then user will be logged in 
        res.cookie('token', userToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict',
            maxAge: 60 * 60 * 1000
        })
        res.status(200).json({ message: 'Successfully logged in' });

    // Internal server error problem we return a statusCode of 500
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Eish sorry an internal server error occurred' });
    }
};

// Get user profile
const myProfile = async (req, res) => {
    try {
        // We get token from cookie
        const tokenUser = req.cookies.token

        // If no token is found we return a message with statusCode of 401
        if (!tokenUser) {
            return res.status(401).json({ message: 'Sorry no token provided'})
        }

        // We decode the token to extract userId
        // Save userId in a variable called userId after it has be extracted
        const decode = jwt.verify(tokenUser, JWT_SECRET);
        const userId = decode.userId;

        //Initialize db
        const db = getDb();

        // convert
        const objectId = new ObjectId(userId)

        // Find user in databse
        const user = await db.collection('users').findOne({ _id: objectId }, 'username email createdAt');
        
        // If the user found send the user data back to the user
        // If the user is not found we return the statusCode 404
        if (user) {
            return res.status(200).json({
                username: user.username,
                email: user.email,
                joined: user.createdAt
            });
        } else {
            return res.status(404).json({ message: 'Sorry user not found'})
        }
    // Internal server error problem we return statusCode of 500
    } catch (err) {
        console.error(err);
        res.send(500).json('Eish sorry an internal server error occurred')
    }
};



// Exports register
module.exports = {
    register,
    userLogin,
    myProfile
};