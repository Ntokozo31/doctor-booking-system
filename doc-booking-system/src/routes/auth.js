// Import express
const express = require('express');

// Initialize router
const router = express.Router();

// Import authenticateUser middleware
const authenticateUser = require('../middlewares/authMiddleware');

// Import authController
const { register, userLogin, myProfile, userLogout, updateUserProfile, deleteUserProfile } = require('../controllers/authController');

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
router.get('/profile/', authenticateUser, myProfile);

// Update profile router
// This router will be used to update user profile.
router.put('/profile/update', authenticateUser, updateUserProfile);

// Delete router
// This router will be used to delete user profile
router.delete('/profile/delete', authenticateUser, deleteUserProfile)

// Export router
module.exports = router;