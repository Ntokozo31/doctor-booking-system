// import mongoose
const mongoose = require('mongoose');

// Import dotenv
require('dotenv').config();

// Import doctor model
const Docotor = require('../models/doctor');

// Connect to mongoDB
module.exports = {
    connectToDb: (callback) => {
        MongoClient.connect(uri)
            .then((client) => {
                dbConnection = client.db()
                return callback();
            })
            .catch((err) => {
                console.log('Sorry an error occurred while connecting to the database', err)
            })
    },
    getDb: () => dbConnection
};