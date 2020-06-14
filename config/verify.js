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

module.exports = async (event) => {
  const request = event.body;
  try {
    await this.sendEmail(request);
    return {
      statusCode: 201,
      headers: {
        'Access-Conttrol-Allow-Origin': '*',
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
    };
  }
};
// module.exports = {
//   sendEmail(from, to, subject, html) {
//     return new Promise((resolve, reject) => {
//       smtpTransport.sendMail(
//         {
//           from,
//           to,
//           subject,
//           html,
//         }, (err, info) => {
//           if (err) reject(err);
//           resolve(info);
//         },
//       );
//     });
//   },
// };
