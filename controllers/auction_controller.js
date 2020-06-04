const express = require('express');

const router = express.Router();

// Import the model (index.js) to use its database functions.
const sag = require('../models/index');

//  const router = Router();


// Create all our routes and set up logic within those routes where required.
router.get('/', (_req, res) => {
  sag.all((data) => {
    const hbsObject = {
      sag: data,
    };
    // console.log("In Get route hbsObject: ",hbsObject);
    res.render('index', hbsObject);
  });
});

router.post('/api/users', (req, res) => {
  sag.create([
    'user_name', 'gallery',
  ],
  [req.body.name, req.body.gallery], (result) => {
    // Send back the ID
    res.json({ id: result.insertId });
  });
});

// router.put('/api/login/:id', (req, res) => {
//   const condition = `id = ${req.params.id}`;
//   console.log('auction_controller.js condition: ', condition);

//   // sag.update(
//   //   {
//   //     gallery: req.body.gallery,
//   //     // devoured: req.body.gallery
//   //   },
//   //   condition,
//   //   (result) => {
//   //     if (result.changedRows === 0) {
//   //       // If no rows were changed, then the ID must not exist, so 404
//   //       return res.status(404).end();
//   //     }
//   //     res.status(200).end();
//   //   },
//   // );
// });

// Export routes for server.js to use.
module.exports = router;
