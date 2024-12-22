//Import express module
const express = require('express');

//Initialize router
const router = express.Router();

//view all your appointments
router.get('/appointment/:id', (req, res) => {
    res.send('All your booking appointments successfully fetched');
});

//Book an appointment
router.post('/appointment/create', (req, res) => {
    res.send('Your booking appointment was successfully');
});

//Cancel appointment
router.put('/appointment/:id/cancel', (req, res) => {
    res.send('Your booking appointment was successfully cancelled');
});

module.exports = router;