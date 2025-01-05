// Import express
const express = require('express');

// Initiallize router
const router = express.Router();

// Import database
const { getDb } = require('../config/db');

// Import allDocotors
const allDoctors = require('../controllers/doctorController');

// Get all doctors
// This route will be used to retrieve all doctors in our database
router.get('/all/docs', allDoctors);

// Get doctor by Name only
// This route will be used to get doctor by name
router.get('/doc/:name', (req, res) => {
    // Get single doctor by name
    // Get more info about that particulater doctor (name, location, availability...)
    // If the doctor does not exist we ruturn statusCode 400
    // If it a server error we return statusCode 500
    const db = getDb();
    const docName = req.params.name;
    db.collection('doctors').findOne({name: docName})
        .then((doctors) => {
            if (!doctors) {
                return res.status(404).json({ message: 'This Doctor cannot be found'})
            }
            res.send(doctors)
        }) .catch(err => {
            console.log(err);
            res.status(500).send('Sorry an error occured');
        })
    //res.send('Doctor successfully retrieved');
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