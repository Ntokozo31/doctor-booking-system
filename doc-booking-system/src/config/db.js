// import mongoose
const mongoose = require('mongoose');

// Import doctor model
const Docs = require('/src/models/doctor');

// Connect to mongoDB
mongoose.connect(
    'mongodb://localhost:27017/Doctors',
    { useNewUrlParser: true,
    useUnifiedTopology: true, })
    .then(() => console.log('Successfully connected to MongoDb'))
    .catch(err => console.log('Sorry, could not connect to MongoDb', err));

// Add new doctor
const addDoctor = [
    {
        name: 'Dr Ntokozo Dube',
        email: 'ntokozod@gamil.com',
        speciality: 'Cardiologist',
        qualification: 'MBChB',
        experiance: '8 years',
        availability: {
            days: ['Monday', 'Tuesday', 'Friday'],
            startTime: '08:00',
            endTime: '17:00',
        },
        Location: 'Durban',
    }
]

// Insert new doctors to system
Docs.insertOne(addDoctor)
    .then(() => console.log('Doctor successfully added'))
    .catch(err => console.log('Sorry, could not add doctor', err));

// Close connection
mongoose.connection.close();