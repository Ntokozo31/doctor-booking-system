//Import express module
const express = require('express');

//Initialize router
const router = express.Router();

//Book an appointment
router.post('/appointment/create', (req, res) => {
    res.send('Your booking appointment was successfully');
});

//View all your appointments
router.get('appointment/view', (req, res) => {
    res.send('All your bookings successfully fachted');
});

//Cancel appointment
router.put('/appointment/:id/cancel', (req, res) => {
    res.send('Your booking appointment was successfully cancelled');
});

module.exports = router;