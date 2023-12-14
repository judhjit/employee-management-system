const nodemailer = require('nodemailer')
require('dotenv').config();

var transporter = null;

// initialize nodemailer
transporter = nodemailer.createTransport(
    {
        service: 'gmail',
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD
        }
    }
);

module.exports = transporter;