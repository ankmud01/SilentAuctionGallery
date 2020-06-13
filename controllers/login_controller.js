/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const express = require('express');
const passport = require('passport');

const router = express.Router();

// HTML ROUTE FOR LOGIN SCREEN
router.get('/login', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/members');
  } else {
    res.render('login');
  }
});

// ROUTE TO LOGIN USER INTO APPLICATION
router.post('/api/login', (req, res, next) => {
  passport.authenticate('local-login', (err, user, info) => {
    console.log('\n\n\n########userrrr', user);
    if (err) {
      console.log('passport err', err);
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (!user) {
      req.flash('loginMessage', 'No user found.');
      return res.send({ success: false, message: 'loginMessage' });
    }
    req.login(user, (loginErr) => {
      if (loginErr) {
        console.log('loginerr', loginErr);
        return next(loginErr);
      }
      console.log('redirecting....');
      res.cookie('first_name', user.first_name);
      res.cookie('user_id', user.id);
      return res.json(true);
    });
  })(req, res, next);
});

// ROUTE TO LOG OUT USER
router.get('/logout', (req, res) => {
  req.headers.logged = 'false';
  console.log('login_controller line 49 user is logged in: ', req.headers.logged);
  res.render('logout', {
    school: 'North Oconee High School',
    logged: req.isAuthenticated(), // needs to be Not Logged in to show the LogIn menu option
  });
  req.logout();
  res.clearCookie('user_sid');
  res.clearCookie('first_name');
  res.clearCookie('user_id');
  // res.redirect('/login');
});


module.exports = router;
