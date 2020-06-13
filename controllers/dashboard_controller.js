const express = require('express');

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

module.exports = router;
