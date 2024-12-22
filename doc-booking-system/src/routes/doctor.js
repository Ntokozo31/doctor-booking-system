//Importing express module
const express = require('express');

//initialize router
const router = express.Router();

//view all doctors
router.get('/doctors', (req, res) => {
    res.send('This are all your doctors');
});

//view details of specific doctor
router.get('/doctors/:id', (req, res) => {
    res.send('Doctors details successfully fatched');
});

//check doctors availability
router.get('/doctors/:id/availability', (req, res) => {
    res.send('Doctors availability successfully fatched')
});

module.exports = router;