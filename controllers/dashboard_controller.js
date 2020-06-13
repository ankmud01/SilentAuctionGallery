const express = require('express');

const { checkAuthenticated } = require('../config/middleware/isAuthenticated');

const router = express.Router();

// This is get route for dashboard
router.get('/', (req, res) => {
  res.render('profilePage', { title: 'Login Page', school: 'North Oconee Highschool' });
//   console.log('Line 13 - In Get / route');
});

router.get('/profile', (req, res) => {
  res.render('userProfilepage', { title: 'Login Page', school: 'North Oconee Highschool' });
//   console.log('Line 13 - In Get / route');
});

router.get('/gallery', (req, res) => {
  res.render('artGallery', { title: 'Login Page', school: 'North Oconee Highschool' });
//   console.log('Line 13 - In Get / route');
});

router.get('/privacypolicy', (req, res) => {
  res.render('newPrivacyPolicy', { title: 'Login Page', school: 'North Oconee Highschool' });
//   console.log('Line 13 - In Get / route');
});

router.get('/home', (req, res) => {
  res.render('homePage', { title: 'Login Page', school: 'North Oconee Highschool' });
//   console.log('Line 13 - In Get / route');
});

module.exports = router;
