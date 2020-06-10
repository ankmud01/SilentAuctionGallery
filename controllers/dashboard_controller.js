const express = require('express');

const { checkAuthenticated, checkNotAuthenticated } = require('../config/middleware/isAuthenticated');

const router = express.Router();

// This is get route for dashboard
router.get('/', checkAuthenticated, (req, res) => {
  req.headers.logged = 'true';
  res.render('index', { title: 'Gallery', school: 'North Oconee Highschool', logged: req.headers.logged });
//   console.log('Line 13 - In Get / route');
});

module.exports = router;
