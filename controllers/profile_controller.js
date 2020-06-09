const express = require('express');
// const passport = require('passport');
const db = require('../models');

const router = express.Router();

// This is to get profile data for the user
router.get('/api/profile/:id', (req, res) => {
  const condition = `id = ${req.params.id}`;
  console.log(`User ID: ${condition}`);

  db.User.findOne(
    {
      where: {
        id: req.params.id,
      },
    },
  ).then((users) => {
    // Pass in the cloumn name after users to get the required value
    // e.g. res.json(user.last_name)
    res.json(users);
  });
});

module.exports = router;
