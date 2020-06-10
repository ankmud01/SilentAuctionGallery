const express = require('express');

const { checkAuthenticated } = require('../config/middleware/isAuthenticated');

const router = express.Router();

// Import the model (index.js) to use its database functions.
// eslint-disable-next-line no-unused-vars
const sag = require('../models/user');

// This is get route for login page
router.get('/donate', checkAuthenticated, (req, res) => {
  req.headers.logged = 'true';
  res.render('donate2', { title: 'Donations Page', school: req.body.school, logged: req.headers.logged });
});

// Export routes for server.js to use.
module.exports = router;
