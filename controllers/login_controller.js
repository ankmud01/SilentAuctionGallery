const express = require('express');
const passport = require('passport');
const db = require('../models');
const { checkNotAuthenticated } = require('../config/middleware/isAuthenticated');

const router = express.Router();

// This is get route for login page
router.get('/login', checkNotAuthenticated, (req, res) => {
  req.headers.logged = 'true';
  res.render('login', { title: 'Login Page', school: 'North Oconee High School', logged: req.isAuthenticated() });
});

// This is get route for all users
router.get('/members' /* '/api/user' */, (req, res) => {
  db.User.findAll({}).then((users) => {
    req.headers.logged = 'true';
    res.json(users);
    res.render('members', { logged: req.isAuthenticated() });
  });
});

// This is post route for login page
router.post('/api/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/members' /* '/api/user' */,
  faliureRedirect: '/login',
  faliureFlash: true,
}));

router.get('/logout', (req, res) => {
  req.headers.logged = 'false';
  console.log(
    'login_controller line 49 user is logged in: ',
    req.headers.logged,
  );
  res.render('logout', {
    school: 'North Oconee High School',
    logged: req.isAuthenticated(), // needs to be Not Logged in to show the LogIn menu option
  });
  req.logout(); // Needs to be a separate LoguOut Page
  // res.render('/login', { logged: req.headers.logged });
});

// Export routes for server.js to use.
module.exports = router;
