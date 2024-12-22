//import express library
const express = require('express');

//instatiate the app
const app = express();

const authRoutes = require('./routes/auth');

//Middleware for json parsing
app.use(express.json());

//Use the auth route
app.use('/auth', authRoutes);

//Welcoming home page
app.get('/', (req, res, next) => {
    res.send('Welcome to DocBook - Your Trusted Doctor Booking Solution');
});

//Invoke the app's .listening method
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost: ${PORT}`)
});