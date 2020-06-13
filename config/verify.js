/* eslint-disable prefer-arrow-callback */

const nodemailer = require('nodemailer');
require('dotenv').config();

async function main() {
  const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  // eslint-disable-next-line no-unused-vars
  smtpTransport.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log('Server is ready to take our messages');
    }
  });

  // let info = await smtpTransport.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     console.log(`error is ${error}`);
  //     resolve(false); // or use rejcet(false) but then you will have to handle errors
  //   } else {
  //     console.log(`Email sent: ${info.response}`);
  //     resolve(true);
  //   }
  // });
}

main().catch(console.error);
// module.export = smtpTransport;
