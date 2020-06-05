const express = require('express');

const router = express.Router();

// This is get route for dashboard
router.get('/', (req, res) => {
  res.render('index', { title: 'Login Page', school: 'North Oconee Highschool' });
//   console.log('Line 13 - In Get / route');
});

module.exports = router;
