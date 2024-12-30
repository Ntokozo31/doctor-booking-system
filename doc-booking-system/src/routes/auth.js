// Import express
const express = require('express');

// Import middlewares
const { validateRegistration, validateLogin } = require('../middlewares/auth');

// Import auth controller
const { register, login, logout, getProfile } = require('../controllers/authController');

// Create router
const router = express.Router();

// Registration router
router.post('/register', register);

// Login router
router.post('/login', login);

// Logout router
router.post('/logout', logout);

// Profile router
router.get('/profile/:id', getProfile);

// Exports router
module.exports = router;