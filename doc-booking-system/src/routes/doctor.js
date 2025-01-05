// Import express
const express = require('express');

// Initiallize router
const router = express.Router();

// Import database
const { getDb } = require('../config/db');

// Import allDocotors
const { allDoctors, doctorByName } = require('../controllers/doctorController');

// Get all doctors
// This route will be used to retrieve all doctors in our database
router.get('/all/docs', allDoctors);

// Get doctor by Name only
// This route will be used to get doctor by name
router.get('/doc/:name', doctorByName);

// New doctor to the system
// This route will be used to add new doctor to the system (admin)
router.post('/new/doc', (req, res) => {
    res.send('New doctor successfully added');
});

// Update doctor details
// This route will be used to update doctor details (admin)
router.put('/update/doc/:id', (req, res) => {
    res.send('Doctor details successfully updated');
});

// Delete doctor from the system
// This route will be used to delete doctor from the system (admin)
router.delete('/delete/doc/:id', (req, res) => {
    res.send('Doctor successfully deleted');
});

// Export router
module.exports = router;