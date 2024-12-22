//importing express module
const express = require('express');

//initialize router
const router = express.Router();

//Registration router
router.post('/users/register', (req, res) => {
    res.send('User registration successfully');
});

//Login route
router.post('/users/login', (req, res) => {
    res.send('User login successfully');
});

//Logout route
router.post('/users/logout', (req, res) => {
    res.send('User logout successfully');
});

//Profile route (view/ update profile)
router.get('/users/profile', (req, res) => {
    res.send('User profile fatched successfully');
});
router.put('/users/profile', (req,res) => {
    res.send('User successfully updated profile');
});

module.exports = router;