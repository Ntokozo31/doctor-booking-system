// Import express
const express = require('express');

// Initialize router
const router = express.Router();

// Import database
const { register, userLogin, myProfile, userLogout } = require('../controllers/authController');

// Registration router
// This router will be used to register user
router.post('/register', register);
    //res.send('User registered successfully');

// Login router
// This router will be used to login user
router.post('/login',userLogin);

// Logout router
// This router will be used to logout user
router.post('/logout', userLogout);

// Profile router
// This router will be used to get user profile
router.get('/profile/', myProfile);

// Export router
module.exports = router;