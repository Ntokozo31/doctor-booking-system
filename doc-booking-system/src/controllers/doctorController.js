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

// Get doctor by name
const doctorByName = async (req, res) => {
    try {
        // Retrieve doctor by name in our db
        // Get more info about that particular doctor (name, location, availability...)
        // If the doctor does not exist we return a statusCode 404
        // If it a server error we return statusCode of 500
        const db = getDb();
        const docName = req.params.name;
        const doctor = await db.collection('doctors').findOne({name: docName})
        if (!doctor) {
            return res.status(404).json({ message: 'This doctor cannot be found'});
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
    doctorByName
};