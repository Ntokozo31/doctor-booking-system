// Import getDb from db
const { getDb } = require('../config/db');

const { ObjectId } = require('mongodb');

// book appointment with doctor
const bookAppointment = async (req, res) => {
    try {
        // Extract userid, specialization, location, days and time in req.bod
        // Validate al fields that are being extracted in req.body
        // If one or more fields are empty we return statusCode of 400
        // Validate userId
        // Validate user
        // Find available doctor based on preference of user (speciality,location,days and time)
        // If no doctor being found we return a statusCode of 404
        // Create new appointment for user and store it in our Database
        const { userId, speciality, location, days, time } = req.body;
        if (!userId || !speciality || !location || !days || !time) {
            return res.status(400).json({ message: 'Sorry all this field are required'})
        }

        const db = getDb();

        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Sorry invalid user id'})
        }
        
        const user = await db.collection('users').findOne({_id: new ObjectId(userId)})
        if (!user) {
            return res.status(400).json({ message: 'Sorry user does not exist'})
        }

        const doctor = await db.collection('doctors').findOne({
            speciality,
            location,
            'availability.days': days,
            'availability.startTime': {$lte: time},
            'availability.endTime': {$gte: time}
        });

        if (!doctor) {
            return res.status(404).json({ message: 'Sorry no doctor available found for this date'})
        }

        const docBook = {
            userId: new ObjectId(userId),
            doctorId: doctor._id,
            doctorName: doctor.name,
            location,
            speciality,
            days,
            time,
            status: 'booked'
        }

        await db.collection('appointments').insertOne(docBook)
        res.status(201).json({ message: 'Your Appointment Booking is now Complete!', Details: {
            doctorName: docBook.doctorName,
            location: docBook.location,
            days: docBook.days,
            time: docBook.time,
            status: docBook.status
        }})

    // Catch an error if its related to our server error
    // We return statusCode of 500 if it so (server error) 
    } catch (err) {
        console.error(err)
        res.status(500).send('Eish sorry an internal server error occurred')
    }
};

// Get user appointment
const allAppointment = async (req, res) => {
    try {
        // Get all user appointment
        const db = getDb();
        const userId = req.params.userId
        const userAppointment = await db.collection('appointments').findOne({userId});
        if (!userAppointment) {
            return res.status(404).json({ message: 'Sorry you dont have any appointment!'})
        }
        res.send(userAppointment)
    } catch (err) {
        console.error('Eish sorry an internal server error occurred')
    }
};

// Export Module
module.exports = { 
    bookAppointment,
    allAppointment
};