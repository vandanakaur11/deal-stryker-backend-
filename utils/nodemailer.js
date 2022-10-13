const nodemailer = require('nodemailer');
const { config } = require('../config/index');


const sendMail = async (option) => {

    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        auth: {
            user: 'softapps.io3@gmail.com',
            pass: config.node_mailer_secret
        }
    });

    mailTransporter.sendMail(option, function (err, data) {
        if (err) {
            console.log('Error Occurs', err.message);
        } else {
            console.log('Email sent successfully');
        }
    });
}

module.exports = {
    sendMail
}