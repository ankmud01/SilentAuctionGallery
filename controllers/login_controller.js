const express = require('express');
// const passport = require('../config/passport');

const router = express.Router();

// Import the model (index.js) to use its database functions.
// eslint-disable-next-line no-unused-vars
const sag = require('../models/user');

// This is get route for login page
router.get('/login', (req, res) => {
  res.render('login', { title: 'Login Page', school: 'North Oconee High School' });
});

// This is post route for login page
// router.post('/api/login', passport.authenticate('local'), (req, res) => {
//   res.json(req.user);
// });

// Export routes for server.js to use.
module.exports = router;
