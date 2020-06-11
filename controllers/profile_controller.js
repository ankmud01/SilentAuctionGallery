const express = require('express');
// const passport = require('passport');
const db = require('../models');

const router = express.Router();

// This is to get profile data for the user
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
      id: req.user.id,
      fullName: (`${req.user.first_name} ${req.user.last_name}`),
      firstName: req.user.first_name,
      lastName: req.user.last_name,
      address1: req.user.address,
      address2: req.user.address2,
      city: req.user.city,
      state: req.user.state,
      zipcode: req.user.zip,
      phone: req.user.phone,
      email: req.user.email,
      school: req.user.school
    });
  }
});

module.exports = router;
