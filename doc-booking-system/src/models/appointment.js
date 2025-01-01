// Import express
const express = require('express');

// Import mongoose
const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    // User id
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    // Doctor id
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true,
    },
    // Appointment date
    date: {
        type: Date,
        required: true,
    },
    // Appointment time
    time: {
        type: String,
        required: true,
    },
    // Appointment status
    status: {
        type: String,
        enum: ['pending', 'approved', 'cancelled'],
        default: 'pending',
    },
    // createdAt
    createdAt: {
        type: Date,
        default: Date.now,
    },
    // cancell appointment
    cancelBy: {
        type: String,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    // cancelled at
    cancelledAt: {
        type: Date,
        default: Date.now,
    },
});

// Export module
module.exports = mongoose.model('Appointment', AppointmentSchema);