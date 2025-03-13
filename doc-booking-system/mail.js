const { Resend } = require('resend');

require('dotenv').config();

const RESEND_API_KEY = process.env.RESEND_API_KEY;

const resend = new Resend(RESEND_API_KEY);

async function sendConfirmationEmail({userName, userEmail, doctor, days, time}) {
    try {
        const {data, error} = await resend.emails.send({
            from: 'DoBook <onboarding@resend.dev>',
            to: userEmail,
            subject: 'Appointment Confirmation',
            html: `
                <p>Hi <strong>${userName}</strong>,</p>
                <p>Your appointment with Dr. <strong>${doctor}</strong> has been confirmed for ${days} at ${time}.</p>
                <p>Thank you for booking with us.</p>
            `
        });

        if (error) {
            console.error('Email failed to send', error);
            return {Success: false, error};
        }

        console.log('Email sent successfully', data);
        return {Success: true, data};
    } catch (error) {
        console.error('An error occurred', err);
        return {Success: false, error: err};
    }
}

module.exports = { sendConfirmationEmail };