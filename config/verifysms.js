// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure

const accountSid = process.env.TWILIO_ACC_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
// eslint-disable-next-line import/no-unresolved
const client = require('twilio')(accountSid, authToken);

client.messages.create({
  to: +17178080770,
  from: process.env.TWILIO_PHONE_NUM,
  body: 'This to be a variable that reports recipient has been out bid.', // message,
})
  .then((message) => console.log(message.sid));

// client.verify.services.create({friendlyName: 'My First Verify Service'})
//                       .then(service => console.log(service.sid));

//                       client.verify.services('VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
//              .verifications
//              .create({to: '+15017122661', channel: 'sms'})
//              .then(verification => console.log(verification.status));
