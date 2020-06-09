const express = require('express');
const passport = require('passport');
const db = require('../models');
const { checkNotAuthenticated } = require('../config/middleware/isAuthenticated');

const router = express.Router();

// This is get route for login page
router.get('/login', checkNotAuthenticated, (req, res) => {
  req.headers.logged = 'false';
  res.render('login', { title: 'Login Page', school: 'North Oconee High School' });
});

// This is get route for all users
router.get('/members' /* '/api/user' */, (req, res) => {
  db.User.findAll({}).then((users) => {
    res.json(users);
  });
});

// This is post route for login page
router.post('/api/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/members' /* '/api/user' */,
  faliureRedirect: '/login',
  faliureFlash: true,
}));

// Route for getting some data about our user to be used client side
router.get('/api/user_data', (req, res) => {
  if (!req.user) {
    req.headers.logged = 'false';
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id,
    });
  }
});

// Route for logging user out
router.get('/logout', (req, res) => {
  req.headers.logged = 'true';
  req.logout(); // Needs to be a separate LoguOut Page
  res.redirect('/login');
});

// Export routes for server.js to use.
module.exports = router;
