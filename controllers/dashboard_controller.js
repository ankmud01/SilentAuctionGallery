const express = require('express');

const { checkAuthenticated } = require('../config/middleware/isAuthenticated');

const router = express.Router();

// HTML ROUTE FOR DASHBOARD SCREEN
router.get('/', checkAuthenticated, (req, res) => {
  if (req.isAuthenticated()) {
    res.render('index', { title: 'Gallery', school: 'North Oconee Highschool', logged: req.isAuthenticated() });
  }
});

module.exports = router;
