// Import getDb from db
const { getDb } = require('../config/db');

// Get doctors in our database
const allDoctors = async (req, res) => {
    try {
        // We retrieve our doctors
        // Retrieve them by name, speciality and location from database
        const db = getDb();
        db.collection('doctors').find({}, {projection: { name: 1, speciality: 1, location: 1}}).toArray()
            .then(doctors => {
                res.send(doctors);
            })
    // If our server has an error we return statusCode of 500
    } catch (err) {
        console.error(err);
        res.status(500).send('Eish sorry an internal server error occurred');
    }
}


// Export modules
module.exports = allDoctors;