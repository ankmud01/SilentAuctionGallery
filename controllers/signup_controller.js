const express = require('express');
const { checkAuthenticated, checkNotAuthenticated } = require('../config/middleware/isAuthenticated');
const { smtpTransport } = require('../config/verify');

const router = express.Router();

// Import the model (index.js) to use its database functions.
const db = require('../models');

// This is a get route for members page
router.get('/members', checkAuthenticated, (req, res) => {
  req.headers.logged = 'true';
  console.log('Signup controller Line 13 user is logged in: ', req.isAuthenticated());
  res.render('members', { title: 'Registered Member Page', school: 'North Oconee High School', logged: req.isAuthenticated() });
  // console.log('Line 13 - In Get / route');
});

// This is a get route for signup page
router.get('/signup', checkNotAuthenticated, (req, res) => {
  req.headers.logged = 'false';
  res.render('signup', { title: 'Registration Page', school: 'North Oconee High School', logged: req.isAuthenticated() });
  // console.log('Line 13 - In Get / route');
});

router.get('/privacypolicy', (req, res) => {
  res.render('privacypolicy', { title: 'Privacy Policy Page', school: 'North Oconee High School', logged: req.isAuthenticated() });
});

// This is post route for signup page
router.post('/api/signup', checkNotAuthenticated, (req, res) => {
  console.log(req.body);
  console.log('Signup_controller School: ', req.body.school);
  db.User.create({
    first_name: req.body.firstname,
    last_name: req.body.lastname,
    email: req.body.email,
    password: req.body.email,
    phone: req.body.phonenumber,
    address: req.body.address,
    address2: req.body.address2,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zipcode,
    school: req.body.school,
  }).then((result) => {
    res.json({ id: result.insertId });
  })
    .catch((err) => {
      res.status(410).json(err);
    });
});


// Email verification
let rand;
let mailOptions;
let host;
let link;
router.get('/send', checkNotAuthenticated, (req, res) => {
  rand = Math.floor((Math.random() * 100) + 54);
  console.log('email Verification random number:', rand);
  host = req.get('host');
  link = `http://localhost:3000/verify?id=${rand}`;
  // link = `http://${req.get(host)}/verify?id=${rand}`;
  mailOptions = {
    to: req.query.to,
    subject: 'Silent Auction Gallery is asking you to confirm your Email account',
    html: 'Hi there,<br> Please Click on the link to verify your email. <br><a href=' + link + '>Click here to verify</a>',
  };
  console.log('Sent by:', process.env.GMAIL_USERNAME);
  console.log(mailOptions);
  smtpTransport.sendMail(mailOptions, (error, response) => {
    if (error) {
      console.log(error);
      res.end('error');
    } else {
      console.log(`'Message sent: ${response}`);
      res.end('sent');
    }
  });
});

router.get('/verify', (req, res) => {
  host = 'localhost:3000';
  // eslint-disable-next-line prefer-template
  console.log(req.protocol + ':/' + req.get('host'));
  // eslint-disable-next-line prefer-template
  if ((req.protocol + '://' + req.get('host')) === ('http://' + host)) {
    console.log('Domain is matched. Information is from Authentic email. Random number in rand:', req.query.id);
    console.log('Random number :', rand);
    if (parseInt(req.query.id, 10) === rand) {
      console.log('email is verified');
      // eslint-disable-next-line prefer-template
      res.render('members', { title: 'Profile Page', school: 'North Oconee High School', logged: req.isAuthenticated() });
      //res.end('members, <h1>Email ' + mailOptions.to + ' is been Successfully verified');
    } else {
      console.log('email is not verified');
      res.end('<h1>Bad Request</h1>');
    }
  } else {
    res.end('<h1>Request is from unknown source');
  }
});

// router.put('/api/login/:id', (req, res) => {
//   const condition = `id = ${req.params.id}`;
//   console.log(`auction_controller.js condition: ${condition}`);

//   sag.update(
//     {
//       user: req.body.email,
//       // gallery: req.body.gallery
//     },
//     condition,
//     (result) => {
//       if (result.changedRows === 0) {
//         // If no rows were changed, then the ID must not exist, so 404
//         return res.status(404).end();
//       }
//       return res.status(200).end();
//     },
//   );
// });

// Export routes for server.js to use.
module.exports = router;
