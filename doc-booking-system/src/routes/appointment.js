// Import express
const express = require('express');
const {
    bookAppointment,
    allAppointment,
    availableSlots
} = require('../controllers/appointmentController');

// Initialize the router
const router = express.Router();

// Create an appointment
// This route will be used to create an appointment
router.post('/create', bookAppointment);

// Get all appointments for that user
// This route will be used to get all appointment for user
router.get('/all/', allAppointment);

// Check available slots
// This route will be used to ckeck available slots
router.post('/slots', availableSlots);

// Export the router
module.exports = router;