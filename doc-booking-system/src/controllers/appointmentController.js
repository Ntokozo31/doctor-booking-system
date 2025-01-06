// Import getDb from db
const { getDb } = require('../config/db');

const { ObjectId } = require('mongodb');

// book appointment with doctor
const bookAppointment = async (req, res) => {
    try {
        // Extract userid, specialization, location, days and time in req.bod
        // Validate al fields that are being extracted in req.body
        // If one or more fields are empty we return statusCode of 400
        const { userId, speciality, location, days, time } = req.body;
        if (!userId || !speciality || !location || !days || !time) {
            return res.status(400).json({ message: 'Sorry all this field are required'})
        }
        const db = getDb();
        // Validate userId
        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Sorry invalid user id'})
        }
        
        // Validate user
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
        //const existAppointment = await db.collection('appointments').findOne({ userId: ObjectId });
        //if (existAppointment) {
            //return res.status(400).send('Appointment already booked for you')
        //}
        // Create and save booking
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
    } catch (err) {
        console.error(err)
        res.status(500).send('Eish sorry an internal server error occurred')
    }
};

// Export Module
module.exports = { bookAppointment };