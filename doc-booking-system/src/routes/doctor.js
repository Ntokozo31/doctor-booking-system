// Import express
const express = require('express');

// Initiallize router
const router = express.Router();

// Import database
const { getDb } = require('../config/db');

// Get all doctors
// This route will be used to get all doctors
router.get('/all/docs', (req, res) => {
    // Get all doctors from the database
    const db = getDb();
    db.collection('doctors').find({}, {projection: { name: 1, speciality: 1, location: 1} }).toArray()
        .then(doctors => {
            res.send(doctors);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('An error occured');
        })
    //res.send('All doctors successfully retrieved');
});

// Get doctor by id only
// This route will be used to get doctor by id
router.get('/doc/:id', (req, res) => {
    res.send('Doctor successfully retrieved');
});

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