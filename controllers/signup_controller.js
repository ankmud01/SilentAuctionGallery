const express = require('express');
const { checkAuthenticated, checkNotAuthenticated } = require('../config/middleware/isAuthenticated');


const router = express.Router();

// Import the model (index.js) to use its database functions.
const db = require('../models');

// This is a get route for members page
router.get('/members', checkAuthenticated, (req, res) => {
  req.headers.logged = 'true';
  console.log('Signup controller Line 13 user is logged in: ', req.isAuthenticated());
  res.render('members', { title: 'Registered Member Page', school: 'North Oconee High School', logged: req.isAuthenticated() });
  // console.log('Line 13 - In Get / route');
});

// This is a get route for signup page
router.get('/signup', checkNotAuthenticated, (req, res) => {
  req.headers.logged = 'false';
  res.render('signup', { title: 'Registration Page', school: 'North Oconee High School', logged: req.isAuthenticated() });
  // console.log('Line 13 - In Get / route');
});

// This is post route for signup page
router.post('/api/signup', checkNotAuthenticated, (req, res) => {
  console.log(req.body);
  console.log('Signup_controller School: ', req.body.school);
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
    //
    // res.render('members', { title: 'Members Page', logged: req.isAuthenticated() });
  })
    .catch((err) => {
      res.status(410).json(err);
    });
});

// router.put('/api/login/:id', (req, res) => {
//   const condition = `id = ${req.params.id}`;
//   console.log(`auction_controller.js condition: ${condition}`);

//   sag.update(
//     {
//       user: req.body.email,
//       // gallery: req.body.gallery
//     },
//     condition,
//     (result) => {
//       if (result.changedRows === 0) {
//         // If no rows were changed, then the ID must not exist, so 404
//         return res.status(404).end();
//       }
//       return res.status(200).end();
//     },
//   );
// });

// Export routes for server.js to use.
module.exports = router;
