// Import express
const express = require('express');

// Initialize the router
const router = express.Router();

// Create an appointment
router.post('/create', (req, res) => {
    res.send('Your appointment has been created successfully');
});

// Get all appointments for that user
router.get('/all/:id', (req, res) => {
    res.send('All your appointments have been retrieved successfully');
});

// Update appointment
router.put('/update/:id', (req, res) => {
    res.send('Your appointment has been updated successfully');
});

// Cancel appointment
router.delete('/canel/:id', (req, res) => {
    res.send('Your appointment has been cancelled successfully');
});

// Check available slots
router.get('/slots', (req, res) => {
    res.send('Available slots retrieved successfully');
});

// Export the router
module.exports = router;