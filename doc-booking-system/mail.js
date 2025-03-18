// This file contains the function to send a confirmation email to the patient after booking an appointment.
// Import the Sendinblue
const SibApiV3Sdk = require('sib-api-v3-sdk');

// Load the environment variables
require('dotenv').config();

// Set the API key
SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;

// Create an instance of the TransactionalEmailsApi
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

// Function to send a confirmation email to the patient
// The function takes the user's email, location, doctor, days, and time as arguments
// The function sends an email to the user confirming the appointment
// The function returns an error if the email fails to send
const sendConfirmationEmail = async ({ userEmail, location, doctor, days, time }) => {
    try {
        // The HTML content of the email
        const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Appointment Confirmation</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        background-color: #ffffff;
                        margin: 50px auto;
                        padding: 20px;
                        border-radius: 10px;
                        max-width: 600px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    h1 {
                        color: #2a9d8f;
                    }
                    p {
                        font-size: 16px;
                        color: #333333;
                    }
                    .footer {
                        margin-top: 20px;
                        font-size: 12px;
                        color: #777777;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Appointment Confirmation</h1>
                    <p>Dear Patient</p>
                    <p>Your appointment with <strong>${doctor}</strong> has been confirmed.</p>
                    <h3>Appointment Details</h3>
                    <p><strong>Doctor Name:</strong> ${doctor}</p>
                    <p><strong>Location:</strong> ${location}</p>
                    <p><strong>Day:</strong> ${days}</p>
                    <p><strong>Time:</strong> ${time}</p>
                    <p><strong>Status:</strong> Booked</p>
                    <p>If you have any questions or need to reschedule, please contact us at 
                        <a href="mailto:doctorbook77@gmail.com">doctorbook77@gmail.com</a>.
                    </p>
                    <p>We look forward to seeing you soon.</p>
                    <p>Warm regards,<br>DocBook Team</p>
                    <div class="footer">
                        <p>&copy; 2025 DocBook. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        // The email details
        // The email is sent to the user's email address
        const sendSmtpEmail = {
            to: [{ email: userEmail }],
            sender: { name: 'DocBook Team', email: 'docbook77@gmail.com' },
            subject: 'Appointment Confirmation',
            htmlContent: htmlContent
        };

        // Send the email using the Sendinblue API
        // The response contains the details of the email sent
        const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log('Email sent successfully:', response);
    // Catch any errors that occur during the email sending process
    // Log the error to the console
    } catch (error) {
        console.error('Error occurred:', error);
        return error;
    }
};

// Export the sendConfirmationEmail function
module.exports = sendConfirmationEmail;