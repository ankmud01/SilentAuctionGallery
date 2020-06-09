const express = require('express');
const { checkAuthenticated, checkNotAuthenticated } = require('../config/middleware/isAuthenticated');


const router = express.Router();

// Import the model (index.js) to use its database functions.
const db = require('../models');

// This is a get route for members page
router.get('/members', checkAuthenticated, (req, res) => {
  req.headers.logged = 'true';
  console.log('is logged in: ', req.headers.logged);
  res.render('members', { title: 'Registered Member Page', school: 'North Oconee High School' });
  // console.log('Line 13 - In Get / route');
});

// This is a get route for signup page
router.get('/register', checkNotAuthenticated, (req, res) => {
  req.headers.logged = 'false';
  res.render('signup', { title: 'Registration Page', school: 'North Oconee High School' });
  // console.log('Line 13 - In Get / route');
});

// This is post route for signup page
router.post('/api/signup', checkNotAuthenticated, (req, res) => {
  console.log(req.body);
  db.User.create({
    first_name: req.body.firstname,
    last_name: req.body.lastname,
    email: req.body.email,
    password: req.body.email,
    phone: req.body.phonenumber,
    address: req.body.address,
    address2: req.body.address2,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zipcode,
    school: req.body.school,
  }).then((result) => {
    res.json({ id: result.insertId });
  })
    .catch((err) => {
      res.status(410).json(err);
    });
});

module.exports = router;
