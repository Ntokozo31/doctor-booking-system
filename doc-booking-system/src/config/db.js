// import MongoClient
const { MongoClient } = require('mongodb');

// Declare dbConnection variable
let dbConnection;

// Import dotenv
require('dotenv').config();

// Get the URI from the .env file
const uri = process.env.MONGO_URI;

// Connect to mongoDB
module.exports = {
    connectToDb: (callback) => {
        const uriWithReplicaSet = `${uri}?replicaSet=rs0&retryWrites=true&w=majority`;
        MongoClient.connect(uriWithReplicaSet)
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