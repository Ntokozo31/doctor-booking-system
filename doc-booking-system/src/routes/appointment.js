// Import express
const express = require('express');

// Initialize the router
const router = express.Router();

// Create an appointment
// This route will be used to create an appointment
router.post('/create', (req, res) => {
    res.send('Your appointment has been created successfully');
});

// Get all appointments for that user
// This route will be used to get all appointment for user
router.get('/all/:id', (req, res) => {
    res.send('All your appointments have been retrieved successfully');
});

// Update appointment
// This route will be used to udate an appointment
router.put('/update/:id', (req, res) => {
    res.send('Your appointment has been updated successfully');
});

// Cancel appointment
// This route will be used to cancel an appointment
router.delete('/cancel/:id', (req, res) => {
    res.send('Your appointment has been cancelled successfully');
});

// Check available slots
// This route will be used to ckeck available slots
router.get('/slots', (req, res) => {
    res.send('Available slots retrieved successfully');
});

// Export the router
module.exports = router;