// Import mongoose
const mongoose = require('mongoose');

// doctor schema
// This schema will be used to create doctor schema
const docSchema = new mongoose.Schema({
    //doctor name
    name: {
        type: String,
        required: true
    },
    // Doctor email
    email: {
        type: String,
        required: true,
    },
    // Doctor speciality
    speciality: {
        type: String,
        required: true
    },
    // Doctor qualification
    qualification: {
        type: String,
        required: true
    },
    // Doctor experience
    experience: {
        type: String,
        required: true
    },
    // Doctor availability
    availability: {
        days: {
            type: [String],
            required: true,
        },
        startTime: {
            type: String,
            required: true
        },
        endTime: {
            type: String,
            required: true,
        }
    },
    // Doctor location
    location: {
        type: String,
        required: true
    }

});

// schema model
// This model will be used to create doctor model
module.exports = mongoose.model('Doctor', docSchema);