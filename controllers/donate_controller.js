const express = require('express');

const router = express.Router();

// Import the model (index.js) to use its database functions.
// eslint-disable-next-line no-unused-vars
const sag = require('../models/user');

// This is get route for login page
router.get('/donate', (req, res) => {
  res.render('donate', { title: 'Login Page', school: 'North Oconee High School' });
});

// Export routes for server.js to use.
module.exports = router;
