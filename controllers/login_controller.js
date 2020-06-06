const express = require('express');
const passport = require('../config/passport');

const router = express.Router();

// Import the model (index.js) to use its database functions.
// eslint-disable-next-line no-unused-vars
// const db = require('../models');

// This is get route for login page
router.get('/login', (req, res) => {
  res.render('login');
});

// Route for getting some data about our user to be used client side
router.get('/api/user_data', (req, res) => {
  if (!req.user) {
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
  req.logout();
  res.redirect('/');
});

// This is post route for login page
router.post('/api/login', passport.authenticate('local'), (req, res) => {
  console.log(req.body);
  res.json(req.user);
});

// Export routes for server.js to use.
module.exports = router;
