const express = require('express');

const router = express.Router();

// Import the model (index.js) to use its database functions.
// eslint-disable-next-line no-unused-vars
const sag = require('../models/user');

// This is get route for login page
router.get('/donate', (req, res) => {
  req.headers.logged = 'true';
  res.render('donate2');
});

// Export routes for server.js to use.
module.exports = router;
