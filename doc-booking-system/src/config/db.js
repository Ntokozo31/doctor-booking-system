// import mongoose
const mongoose = require('mongoose');

// Import dotenv
require('dotenv').config();

// Import doctor model
const Docotor = require('../models/doctor');

// Connect to mongoDB
mongoose.connect('mongodb://localhost:27017/Doctors')
    .then(() => {
        console.log('Successfully connected to MongoDb')

        // Add new doctor
        const addDoctor = [
            {
                name: 'Dr Jane Doe',
                email: 'janedoe@gmail.com',
                speciality: 'Cardiologist',
                qualification: 'MBChB',
                availability: {
                    days: ['Monday', 'Tuesday', 'Friday'],
                    startTime: '08:00',
                    endTime: '17:00',
                },
                location: 'Durban',
                experience: '8 years'
            }
        ];

        // Insert new doctors to system
        return Docotor.insertMany(addDoctor);
    })
    .then(() => {
        console.log('Doctor successfully added')
        // close connetion
        mongoose.connection.close();
    })
    .catch(err => {
        console.log('Sorry, could not add doctor', err)
        // Close connection
        mongoose.connection.close();
    });