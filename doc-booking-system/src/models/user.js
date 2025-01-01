// Import express
const express = require('express');

// Import mongoose
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    //User name
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    // User email
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    // User passsword
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
});