//importing express module
const express = require('express');

//initialize router
const router = express.Router();

//Registration router
router.get('/register', (req, res) => {
    res.send('User registration successfully');
});

//Login route
router.get('/login', (req, res) => {
    res.send('User login successfully');
});

//Logout route
router.post('/logout', (req, res) => {
    res.send('User logout successfully');
});

//Profile route (view/ update profile)
router.get('/profile', (req, res) => {
    res.send('User profile fatched successfully');
});
router.put('/profile', (req,res) => {
    res.send('User successfully updated profile');
});

module.exports = router;