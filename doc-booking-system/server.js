// Import express
const express = require('express');

// Import connection to dabase
const { connectToDb, getDb } = require('./src/config/db');

//Import cors
const cors = require('cors');

// Import routes
const authRouters = require('./src/routes/auth');

// Initailize the app
const app = express();

// Port setup
const PORT = process.env.PORT || 3000;

// Global cors
app.use(cors());

// Body parser for incoming requests
app.use(express.json());

// Import  authorization routes
const authRouter = require('./src/routes/auth');

// Import appointment router
const appointmentRouter = require('./src/routes/appointment');

// Import doctor router
const doctorRouter = require('./src/routes/doctor');

// Authorization router to handle all the auth routes
app.use('/api/auth', authRouter);

// Appointment router to handle all the appointment routes
app.use('/api/appointment', appointmentRouter);

// Doctor router to handle all the doctor routes
app.use('/api/doctor', doctorRouter);

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to DocBook your number one booking system');
});

// The route that will handle 404, routes not found fallback
app.use((req, res) => {
    res.status(404).send('This route does not exist');
})

// Connect to mongoDb and start the server
let db;
connectToDb((err) => {
    if (!err) {
        // Port listening
        app.listen(PORT, () => {
            console.log(`Server is now running on port ${PORT}`);
        })
        db = getDb();
    }
});

// Export the app
module.exports = app;