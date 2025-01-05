// Import express
const express = require('express');

// Initialize router
const router = express.Router();

// Import database
const { register, userLogin } = require('../controllers/authController');

// Registration router
// This router will be used to register user
router.post('/register', register);
    //res.send('User registered successfully');

// Login router
// This router will be used to login user
router.post('/login',userLogin);

// Logout router
// This router will be used to logout user
router.get('/logout', (req, res) => {
    res.send('User successfully logged out');
});

// Profile router
// This router will be used to get user profile
router.get('/profile/:id', (req, res) => {
    res.send('User profile successfully retrieved');
});

// Export router
module.exports = router;