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

// Export router
module.exports = router;