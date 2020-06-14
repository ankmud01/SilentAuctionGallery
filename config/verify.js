/* eslint-disable prefer-arrow-callback */

const nodemailer = require('nodemailer');
require('dotenv').config();

const smtpTransport = nodemailer.createTransport({
  service: 'gmail',
  host: process.env.GMAIL_SERVICE_HOST,
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD,
  },
});

module.exports = {
  sendEmail(from, to, subject, html) {
    return new Promise((resolve, reject) => {
      smtpTransport.sendMail(
        {
          from,
          subject,
          to,
          html,
        }, (err, info) => {
          if (err) reject(err);
          resolve(info);
        },
      );
    });
  },
};
