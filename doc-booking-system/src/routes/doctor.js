// Import express
const express = require('express');

// Initialize router
const router = express.Router();

// Create doctor profile
// This route will be used to create doctor profile
router.post('/create/doc', (req, res) => {
    res.send('Congratulations! Doctor your profile has been successfully created');
});

// Update doctor profile
// This route will be used to update dotors profile
router.put('/update/doc/:id', (req, res) => {
    res.send('You successfully updated your profile');
});

// Get appointments for a doctor
// This route will be used to get all appointments for a doctor
router.get('/appointments/doc/:id', (req, res) => {
    res.send('All your appointments have been retrieved successfully');
});
// View doctor profile
// This route will be used to view a doctor profile
router.get('/doc/:id', (req, res) => {
    res.send('Doctor profile retrieved successfully');
});

// Doctors availibility
// This route will be used to check doctors availibility
router.get('/availibility/doc', (req, res) => {
    res.send('Doctor is available');
});

// doctors appointments notification
// This route will be used to notify doctor of appointments
router.get('/notification/doc', (req, res) => {
    res.send('You have an appointment');
});

// Export router
module.exports = router;