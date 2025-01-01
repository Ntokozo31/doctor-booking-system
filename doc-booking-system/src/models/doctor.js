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
        unique: true
    },
    // Doctor phone number
    phone: {
        type: Number,
        required: true
    },
    // Doctor speciality
    speciality: {
        type: String,
        required: trusted
    },
    // Doctor qualification
    qualification: {
        type: String,
        required: true
    },
    // Doctor experience
    experience: {
        type: Number,
        required: true
    },
    // Doctor availability
    availability: {
        type: Boolean,
        required: true
    },
    // Doctor location
    location: {
        type: String,
        required: true
    }

});

// schema model
// This model will be used to create doctor model
const Doctor = mongoose.model('Doctor', docSchema);

// Export model
module.exports = Doctor;