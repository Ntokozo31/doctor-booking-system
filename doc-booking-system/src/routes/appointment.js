// Import express
const express = require('express');
const {
    bookAppointment,
    allAppointment,
    userUpdateAppointment,
    userCancelAppointment,
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

// Update appointment
// This route will be used to udate an appointment
router.put('/update', userUpdateAppointment);
    //res.send('Your appointment has been updated successfully');
//});

// Cancel appointment
// This route will be used to cancel an appointment
router.patch('/cancel', userCancelAppointment);
    //res.send('Your appointment has been cancelled successfully');
//});

// Check available slots
// This route will be used to ckeck available slots
router.get('/slots', availableSlots);
    //res.send('Available slots retrieved successfully');
//});

// Export the router
module.exports = router;