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
});

// Function to send confirmation email to user
// We pass in the userName, userEmail and appointmentDetails
// We create a mailOptions object with from, to, subject, text and html
const sendConfirmationEmail = async (userName, userEmail, appointmentDetails) => {
    const mailOptions = {
        from: '"Doctor Booking System" docbook77@gmail.com',
        to: userEmail,
        subject: 'Appointment Confirmation',
        text: `Hello ${userName}, your appointment has been booked successfully. Your appointment details are: ${appointmentDetails}`,
        html: `<p>Hellow <strong>${userName}</strong>,</p><p>Your appointment has been confirmed for ${appointmentDetails}</p>`
    };

    try {
        // Send email to user
        // We await the transporter to send the mail
        // If the mail is sent we console log the message id
        // If there is an error we console log the error
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: ', info.messageId);
    } catch (error) {
        console.error('Error sending mail:', error);
    }
}

module.exports = sendConfirmationEmail;