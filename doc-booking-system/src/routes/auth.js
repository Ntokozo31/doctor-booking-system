//importing express module
const express = require('express');

const router = express.Router();

//Registration router
router.get('/register', (req, res) => {
    res.send('Registration page')
});

//Login route
router.get('/login', (req, res) => {
    res.send('Login page')
});

module.exports = router;