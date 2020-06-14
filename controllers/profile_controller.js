/* eslint-disable no-unused-vars */
const express = require('express');
const db = require('../models');

const router = express.Router();

// ROUTE TO GET USER DETAILS OF SIGNED IN USER
router.get('/profile', (req, res) => {
  console.log('Hello I am in profile');
  if (req.isAuthenticated()) {
    db.User.findOne({
      where: {
        id: req.session.passport.user,
      },
    }).then((dbUser) => {
      console.log(dbUser);
      const user = {
        userInfo: dbUser.dataValues,
        id: req.session.passport.user,
        isloggedin: req.isAuthenticated(),
      };
      console.log('Line 20----->', user.userInfo);
      res.render('userProfilepage', user);
    });
  } else {
    // eslint-disable-next-line no-unused-vars
    const user = {
      id: null,
      isloggedin: req.isAuthenticated(),
    };
    res.redirect('/');
  }
});

// ROUTER TO DELETE ACCOUNT
router.delete('/user/:account_id/:password', (req, res) => {
  console.log(`id: ${req.params.account_id}`);
  console.log(`Password: ${req.params.password}`);
  // db.user.destroy({
  //   where: {
  //     id: req.params.account_id,
  //     account_key: req.params.account_key,
  //   },
  // }).then((dbuser) => {
  //   res.json(dbuser);
  // });
});

// ROUTER TO UPDATE ACCOUNT
router.put('/user/:account_id/:password', (req, res) => {
  db.user.update({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    address: req.body.address1,
    address2: req.body.address2,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    school: req.body.school,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
  }, {
    where: {
      id: req.params.account_id,
      password: req.params.password,
    },
  }).then((dbuser) => {
    res.json(dbuser);
  });
});

module.exports = router;
