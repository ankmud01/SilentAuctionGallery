/* eslint-disable consistent-return */
const express = require('express');
const passport = require('passport');
const { checkNotAuthenticated } = require('../config/middleware/isAuthenticated');

const router = express.Router();

// HTML ROUTE FOR SIGNUP SCREEN
router.get('/signup', checkNotAuthenticated, (req, res) => {
  req.headers.logged = 'false';
  res.render('signup', { title: 'Registration Page', school: 'North Oconee High School', logged: req.isAuthenticated() });
});

// ROUTE FOR PRIVACY POLICY
router.get('/privacypolicy', checkNotAuthenticated, (req, res) => {
  res.render('privacypolicy', { title: 'Privacy Policy Page', school: 'North Oconee High School', logged: req.isAuthenticated() });
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

module.exports = router;
