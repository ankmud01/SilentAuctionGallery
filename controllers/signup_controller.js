const express = require('express');

const router = express.Router();

// Import the model (index.js) to use its database functions.
// const sag = require('../models/user');

//  const router = Router();


// Create all our routes and set up logic within those routes where required.
// Login and default route - The highschool below can be made a variable.

// This is a get route for signup page
router.get('/signup', (req, res) => {
  res.render('signup', { title: 'Login Page', school: 'North Oconee High School' });
  // console.log('Line 13 - In Get / route');
});

// This is post route for signup page
// router.post('/api/signup', (req, res) => {
//   sag.create([
//     'user_name', 'password',
//   ],
//   [req.body.name, req.body.password], (result) => {
//     // Send back the ID
//     res.json({ id: result.insertId });
//   });
// });

// router.put('/api/login/:id', (req, res) => {
//   const condition = `id = ${req.params.id}`;
//   console.log(`auction_controller.js condition: ${condition}`);

//   sag.update(
//     {
//       user: req.body.email,
//       // devoured: req.body.gallery
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
