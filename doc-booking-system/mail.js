// Initiate nodemailer to send email to user
const nodemailer = require('nodemailer');

// We require nodemailer
require('dotenv').config();

// We get the mailtrap password from the .env file
const MAILTRAP_PASSWORD = process.env.MAILTRAP_PASSWORD;

// We get the mailtrap username from the .env file
const MAILTRAP_USERNAME = process.env.MAILTRAP_USERNAME;

// We create a transporter to send email, with host, port and auth
const transporter = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
        user: MAILTRAP_USERNAME,
        password: MAILTRAP_PASSWORD
    }
})