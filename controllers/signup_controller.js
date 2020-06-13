/* eslint-disable prefer-arrow-callback */
/* eslint-disable consistent-return */
const express = require('express');
const passport = require('passport');
const randomstring = require('randomstring');

const smtpTransport = require('../config/verify');

const { checkNotAuthenticated } = require('../config/middleware/isAuthenticated');

const router = express.Router();

// HTML ROUTE FOR SIGNUP SCREEN
router.get('/signup', checkNotAuthenticated, (req, res) => {
  req.headers.logged = 'false';
  res.render('signup', { title: 'Registration Page', school: 'North Oconee High School', logged: req.isAuthenticated() });
});

// ROUTE FOR PRIVACY POLICY
router.get('/privacypolicy', (req, res) => {
  res.render('privacypolicy', { title: 'Privacy Policy Page', school: 'North Oconee High School' });
});

// ROUTE TO SIGNUP A NEW USER
router.post('/api/signup', (req, res, next) => {
  passport.authenticate('local-signup', (err, user, info) => {
    console.log('info', info);
    if (err) {
      console.log('passport err', err);
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (!user) {
      console.log('user error', user);
      return res.send({ success: false, message: 'authentication failed' });
    }
    req.login(user, (loginErr) => {
      if (loginErr) {
        console.log('loginerr', loginErr);
        return next(loginErr);
      }
      console.log('redirecting....');
      res.cookie('first_name', user.first_name);
      res.cookie('user_id', user.id);
      req.flash('success_msg', 'You are now registered');
      return res.redirect('/members');
    });
  })(req, res, next);
});


// Email verification
let rand;
let mailOptions;
let host;
let link;

// user.value.secretToken = secretToken;
// user.value.active = false; // Flag account as inactive until verified

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
  console.log('Line 69 signup_controller.js: ', mailOptions);
  // eslint-disable-next-line func-names
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
