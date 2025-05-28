// Import getDb from db
const { getDb } = require('../config/db');

// Import ObjectId from mongodb
const { ObjectId } = require('mongodb');

// Import jwt from jsonwebtoken
const jwt = require('jsonwebtoken');

// Import dotenv
require('dotenv').config();

// Intialize JWT_SECRET
const JWT_SECRET = process.env.JWT_SECRET;

// Import sendConfirmationEmail from mail.js
const sendConfirmationEmail = require('../../mail');

// book appointment with doctor
const bookAppointment = async (req, res) => {
    try {
        // Extract speciality, location, days and time in req.body
        // If one or more fields are empty we return a statusCode of 400
        const { speciality, location, days, time } = req.body;
        if (!req.userId || !speciality || !location || !days || !time) {
            return res.status(400).json({ message: 'Sorry all this field are required'})
        }

        // Iniatialize db
        const db = getDb();

        // We validate userId
        // If userId is not valid we return a statusCode of 400
        if (!ObjectId.isValid(req.userId)) {
            return res.status(400).json({ message: 'Sorry invalid user id'})
        }
        
        // We find user in our database
        // If user is not found we return a statusCode of 400
        const user = await db.collection('users').findOne({_id: new ObjectId(req.userId)})
        if (!user) {
            return res.status(400).json({ message: 'Sorry user does not exist'})
        }

        // We find available doctor based on preference of user (speciality, location, days and time)
        const doctor = await db.collection('doctors').findOne({
            speciality,
            location,
            'availability.days': days,
            'availability.startTime': {$lte: time},
            'availability.endTime': {$gte: time}
        });

        // If no doctor is found we return a statusCode of 404
        if (!doctor) {
            return res.status(404).json({ message: 'No doctor available for this date, please wait a moment while we show you available slots'})
        }

        // We check if user already have a pending appointment
        // If user already have a pedding appointment we return a statusCode of 400
        const alreadyBooked = await db.collection('appointments').findOne({
            userId: new ObjectId(req.userId),
            status: 'booked' });
        if (alreadyBooked) {
            return res.status(400).json({ message: 'Sorry you already have a pedding appointment to attend' })
        }
        // We create new appointment for user and store it in our Database
        const docBook = {
            userId: new ObjectId(req.userId),
            doctorId: doctor._id,
            doctorName: doctor.name,
            location,
            speciality,
            days,
            time,
            status: 'booked'
        }

        // We insert the appointment in our database
        // We return a statusCode of 201 if the appointment is successfully created
        await db.collection('appointments').insertOne(docBook)

        // Send confirmation email to user
        await sendConfirmationEmail({
            userName: user.name,
            userEmail: user.email,
            location: docBook.location,
            doctor: doctor.name,
            days: days,
            time: time
        });

        // We return a statusCode of 201 if the appointment is successfully created
        // We return the appointment details to the user
        res.status(200).json({ message: 'Successfully Booked. Please wait a moment while we show your bookings', Details: {
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
        // Initailize db
        // Conver userId to objectId
        // We find all appointment for user in our database
        // We extract only doctorName, location, speciality, days, time and status
        const db = getDb();
        const objectId = new ObjectId(req.userId)
        const userAppointment = await db.collection('appointments').find({ userId: objectId },
            {projection: {
                _id: 0,
                doctorName: 1,
                location: 1,
                speciality: 1,
                days: 1,
                time: 1,
                status:1}})
                .toArray();

        // If no appointment is found we return a statusCode of 404
        // If appointment is found we return the appointment to the user in an array
        if (userAppointment.length === 0) {
            return res.status(404).json({ message: 'Sorry you dont have any appointment!'})
        }
        res.status(200).json(userAppointment)
    // We catch an error if its related to our server error
    } catch (err) {
        console.error('Eish sorry an internal server error occurred')
    }
};

// Get available slots for user to book
const availableSlots = async (req, res) => {
    try {
        // Extract speciality, location, days in req.body
        // If one or more fields are empty we return a statusCode of 400
        const { speciality, location, days, time} = req.body;
        if (!speciality || !location || !days || !time) {
            return res.status(400).json({ message: 'Sorry all fields are required'})
        }

        // Initialize db
        const db = getDb();

        // We find available doctor based on preference of user (speciality, location, days)
        const availableSlots = await db.collection('doctors').findOne({
            speciality,
            location,
            'availability.days': days
        })

        // If no available slots are found we return a statusCode of 404
        if (!availableSlots) {
            return res.status(404).json({ message: 'Sorry no available slots for this date try to book another date'})
        }

        // If available slots are found we return a statusCode of 200 with available slots details
        res.status(200).json({ message: 'Available slots', Details:
            {
            doctorName: availableSlots.name,
            location: availableSlots.location,
            speciality: availableSlots.speciality,
            days: availableSlots.availability.days,
            startTime: availableSlots.availability.startTime,
            endTime: availableSlots.availability.endTime

        }})
    // Catch an error if its related to our server error
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Eish sorry an internal server error occurred'})
    }
}

// Export Module
module.exports = { 
    bookAppointment,
    allAppointment,
    availableSlots
};