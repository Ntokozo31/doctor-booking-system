// Import getDb from db
const { getDb } = require('../config/db');

// Get doctors in our database
const allDoctors = async (req, res) => {
    try {
        // We retrieve our doctors
        // Retrieve them by name, speciality and location from database
        // If no doctors found we return statusCode of 400
        const db = getDb();
        const doctors = await db.collection('doctors').find({}, {projection: { name: 1, speciality: 1, location: 1}}).toArray()
        if (!doctors) {
            return res.status(400).json({ message: 'Sorry no doctors found'})
        }
        res.send(doctors);
    // If our server has an error we return statusCode of 500
    } catch (err) {
        console.error(err);
        res.status(500).send('Eish sorry an internal server error occurred');
    }
}

// Get doctor by location
const doctorByLocation = async (req, res) => {
    try {
        // Get location from the request body
        // Retrieve doctor by location in our db
        // Get more info about that particular doctor (name, location, availability...) we avoid getting the doctor id
        // If the doctor does not exist we return a statusCode 404
        // If it a server error we return statusCode of 500
        const location = req.params.location;
        if (!location) {
            return res.status(400).json({ message: 'Please provide a location'});
        }

        // Retrieve doctor by location in our db
        // Get more info about that particular doctor (name, location, availability...) we avoid getting the doctor id
        // If the doctor does not exist we return a statusCode 404
        // If it a server error we return statusCode of 500
        const db = getDb();
        const doctor = await db.collection('doctors').find(
            { location: location},
            {   
                projection: {
                    _id: 0,
                    email: 0,
                }
            }
        ).toArray();
        if (doctor.length === 0) {
            return res.status(404).json({ message: 'No doctor found in this location'});
        }
        res.send(doctor);
    // If it a server error we return statusCode of 500
    } catch (err) {
        console.error(err)
        res.status(500).send('Eish sorry an internal server error occurred');
    }
};

// Export modules
module.exports = {
    allDoctors,
    doctorByLocation
};