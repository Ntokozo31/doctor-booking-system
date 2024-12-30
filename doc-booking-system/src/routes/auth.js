// Import express
const express = require('express');

// Import middlewares
//const { validateRegistration, validateLogin } = require('../middlewares/auth');

// Import auth controller
//const { register, login, logout, getProfile } = require('../controllers/authController');

// Create router
const router = express.Router();

// Registration router
router.post('/register', (req, res) => {
    res.send('User registered successfully');
});

// Login router
router.post('/login', (req, res) => {
    res.send('User logged in successfully');
});

// Logout router
router.get('/logout', (req, res) => {
    res.send('User successfully logged out');
});

// Profile router
router.get('/profile/:id', (req, res) => {
    res.send('User profile successfully retrieved');
});

// Export router
module.exports = router;