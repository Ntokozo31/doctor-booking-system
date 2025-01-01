// import mongoose
const mongoose = require('mongoose');

// Import doctor model
const Docs = require('/..models/doctor');

// Connect to mongoDB
mongoose.connect('mongodb://localhost:27017/Doctors', { useNewUrlParser: true, useUnifiedTopology: true });
