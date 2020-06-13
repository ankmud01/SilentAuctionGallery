const express = require('express');

const { checkAuthenticated } = require('../config/middleware/isAuthenticated');

const router = express.Router();

// This is get route for dashboard
router.get('/dashboard', checkAuthenticated, (req, res) => {
  res.render('dashboard', { title: 'Dashboard', school: 'North Oconee Highschool' });
//   console.log('Line 13 - In Get / route');
});

router.get('/profile', checkAuthenticated, (req, res) => {
  res.render('userProfilepage', { title: 'Profile', school: 'North Oconee Highschool' });
//   console.log('Line 13 - In Get / route');
});

router.get('/gallery', checkAuthenticated, (req, res) => {
  res.render('artGallery', { title: 'Art Gallery', school: 'North Oconee Highschool' });
//   console.log('Line 13 - In Get / route');
});

router.get('/privacypolicy', checkAuthenticated, (req, res) => {
  res.render('newPrivacyPolicy', { title: 'Privacy Policy', school: 'North Oconee Highschool' });
//   console.log('Line 13 - In Get / route');
});

router.get('/', (req, res) => {
  res.render('homePage', { title: 'Home', school: 'North Oconee Highschool' });
//   console.log('Line 13 - In Get / route');
});

module.exports = router;
