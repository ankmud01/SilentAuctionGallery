/* eslint-disable prefer-arrow-callback */

const nodemailer = require('nodemailer');
require('dotenv').config();

const smtpTransport = nodemailer.createTransport({
  service: 'gmail',
  // host: process.env.GMAIL_SERVICE_HOST,
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD,
  },
});


module.exports = {
  sendMail(mailOptions, cb) {
    smtpTransport.sendMail(mailOptions, function (error, data) {
      if (error) {
        cb(error, null);
      } else {
        cb(null, data);
      }
    });
  },
};
