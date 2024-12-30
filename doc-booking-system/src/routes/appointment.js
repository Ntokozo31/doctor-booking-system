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