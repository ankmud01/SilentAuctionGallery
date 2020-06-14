/* eslint-disable prefer-arrow-callback */
/* eslint-disable consistent-return */
const express = require('express');
const passport = require('passport');
const db = require('../models');

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
      return res.redirect('/dashboard');
    });
  })(req, res, next);
});


// Email verification
let rand;
let mailOptions;
let host;
let link;
let secretToken;
// user.value.secretToken = secretToken;
// user.value.active = false; // Flag account as inactive until verified

router.get('/send', checkNotAuthenticated, (req, res) => {
  if (req.isAuthenticated()) {
    db.User.findOne({
      where: {
        id: req.session.passport.user,
      },
    }).then((dbUser) => {
      const user = {
        userInfo: dbUser.dataValues,
        id: req.session.passport.user,
        secretToken: dbUser.secretToken,
        isloggedin: req.isAuthenticated(),
      };
      console.log(user.userInfo);
      res.send(user.secretToken);
    }).then(() => {
      link = `http://localhost:${process.env.PORT}/verify?id=${secretToken}`;
      // link = `http://${req.get(host)}/verify?id=${rand}`;
      mailOptions = {
        to: req.query.to,
        subject: 'Silent Auction Gallery is asking you to confirm your Email account',
        // eslint-disable-next-line prefer-template
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
  } else {
    // eslint-disable-next-line no-unused-vars
    const user = {
      id: null,
      isloggedin: req.isAuthenticated(),
    };
    res.redirect('/');
  }
});

router.get('/verify', (req, res) => {
  host = `localhost:${process.env.PORT}`;
  // eslint-disable-next-line prefer-template
  console.log(req.protocol + ':/' + req.get('host'));
  // eslint-disable-next-line prefer-template
  if ((req.protocol + '://' + req.get('host')) === ('http://' + host)) {
    console.log('Domain is matched. Information is from Authentic email. secretToken number in rand:', req.query.id);
    console.log('Random number :', rand);
    if (parseInt(req.query.id, 10) === rand) {
      console.log('email is verified');
      // eslint-disable-next-line prefer-template
      res.render('members', { title: 'Profile Page', school: 'North Oconee High School', logged: req.isAuthenticated() });
      // eslint-disable-next-line spaced-comment
      // res.end('members, <h1>Email ' + mailOptions.to + ' is been Successfully verified');
    } else {
      console.log('email is not verified');
      res.end('<h1>Bad Request</h1>');
    }
  } else {
    res.end('<h1>Request is from unknown source');
  }
});

module.exports = router;
