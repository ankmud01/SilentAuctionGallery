
const nodemailer = require('nodemailer');
require('dotenv').config();


return new Promise(((resolve, reject) => {
  let smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    },

});
let resp = false;

smtpTransport.sendMail(mailOptions, function(error, info) {
  if (error) {
    console.log('From verify.js Error is: ', error);
    resolve(false);
  }
  else {
    console.log('Email sent: ' + info.response);
    resolve(true);
  }
});
