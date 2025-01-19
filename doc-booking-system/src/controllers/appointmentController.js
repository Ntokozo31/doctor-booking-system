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

// book appointment with doctor
const bookAppointment = async (req, res) => {
    try {
        // Extract token from cookie
        // If no token is found we return a statusCode of 401
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({ message: 'Sorry no token provided, Please try to login again'})
        }
        //We decode the token to get userId
        //Sve userId in a variable called userId after it has been extracted
        const decode = jwt.verify(token, JWT_SECRET)
        const userId = decode.userId

        // Extract speciality, location, days and time in req.body
        // If one or more fields are empty we return a statusCode of 400
        const { speciality, location, days, time } = req.body;
        if (!userId || !speciality || !location || !days || !time) {
            return res.status(400).json({ message: 'Sorry all this field are required'})
        }

        // Iniatialize db
        const db = getDb();

        // We validate userId
        // If userId is not valid we return a statusCode of 400
        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Sorry invalid user id'})
        }
        
        // We find user in our database
        // If user is not found we return a statusCode of 400
        const user = await db.collection('users').findOne({_id: new ObjectId(userId)})
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
            return res.status(404).json({ message: 'No doctor available this date, please book another date'})
        }

        // We check if user already have a pending appointment
        // If user already have a pedding appointment we return a statusCode of 400
        const alreadyBooked = await db.collection('appointments').findOne({
            userId: new ObjectId(userId),
            status: 'booked' });
        if (alreadyBooked) {
            return res.status(400).json({ message: 'Sorry you already have a pedding appointment to attend' })
        }
        // We create new appointment for user and store it in our Database
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

        // We insert the appointment in our database
        // We return a statusCode of 201 if the appointment is successfully created
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
        // We get token from cookie
        const tokenUser = req.cookies.token

        // If no token is found we return a statusCode of 401
        if (!tokenUser) {
            return res.status(401).json({ message: 'No token provided'})
        }

        // We decode the token to extract userId
        // Save userId in a variable called userId after it has been extracted
        const decode = jwt.verify(tokenUser, JWT_SECRET);
        const userIdFromToken = decode.userId

        // Initailize db
        // Conver userId to objectId
        // We find all appointment for user in our database
        // We extract only doctorName, location, speciality, days, time and status
        const db = getDb();
        const objectId = new ObjectId(userIdFromToken)
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
const userUpdateAppointment = async (req, res) => {
    try {
        // Extract token from cookie
        // If no token is found we return a statusCode of 401
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({ message: 'Sorry no token provided'})
        }

        // We decode the token to get userId
        // Save userId in a variable called userIdFromToken after it has been extracted
        const decode = jwt.verify(token, JWT_SECRET)
        const userIdFromToken = decode.userId

        // Extract speciality, location, days and time in req.body
        const { doctorId, speciality, location, days, time } = req.body;

        // Iniatialize db
        // Convert userId to objectId
        const db = getDb();
        const objectId = new ObjectId(userIdFromToken)

        // Check if user has a pending appointment or not for user in our db
        const alreadyBooked = await db.collection('appointments').findOne({
            userId: objectId,
            status: 'booked'
        });

        // If user does not have a pending appointment we return a statusCode of 400
        if (!alreadyBooked) {
            return res.status(400).json({ message: 'You dont have a pending appointment, please book one first!'})
        }

        // We find available doctor based on preference of user (speciality, location, days and time)
        const doctor = await db.collection('doctors').findOne({
            speciality,
            location,
            'availability.days': days,
            'availability.startTime': {$lte: time},
            'availability.endTime': {$gte: time}
        });

        // If no doctor is found we return a statusCode of 400
        if (!doctor) {
            return res.status(404).json({ message: 'No doctor available for this date, Please book another date'})
        }

        // We update the appointment for user in our database
        const docBook = {
            userId: objectId,
            doctorId: new ObjectId(doctorId),
            speciality,
            location,
            days,
            time,
            status: 'booked'
        };
        // We update and store new appointment in our database
        const update = await db.collection('appointments').updateOne({
            userId: objectId,
            status: 'booked'},
            {$set: docBook}
        )

        // If appointment was not updated we return a statusCode of 400
        if (update.modifiedCount === 0) {
            return res.status(400).json({ message: 'Sorry appointment was not updated'})
        }

        // If appointment was updated we return a statusCode of 200 with new appointment details
        res.status(200).json({ message: 'Your appointment has successfully updated', Details: {
            doctorName: docBook.doctorName,
            location: docBook.location,
            days: docBook.days,
            time: docBook.time,
            status: docBook.status
        }})
    // Catch an error if its related to our server error
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Eish sorry an internal server error occurred' })
    }
}

// Export Module
module.exports = { 
    bookAppointment,
    allAppointment,
    userUpdateAppointment
};