/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const express = require('express');
const os = require('os');
const db = require('../models');

const router = express.Router();
// ROUTE TO GET USER DETAILS OF SIGNED IN USER
router.get('/profile', async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      await db.sequelize.query('SELECT roles.role_name, user.* FROM user, roles WHERE user.role_id = roles.id AND user.id = :id', {
        replacements: { id: req.session.passport.user },
        type: db.Sequelize.QueryTypes.SELECT,
      })
        .then((dbUser) => {
          console.log('Profile_controller.js Line 17 DB User---->', dbUser[0]);
          const user = {
            userInfo: dbUser[0],
            id: req.session.passport.user,
            active: dbUser[0].active,
            isloggedin: req.isAuthenticated(),
          };
          console.log('Line 24 ##------->user.userInfo:', user);
          if (dbUser[0].role_id > 1) {
            res.render('userProfilepage', user);
          } else {
            res.render('adminProfilepage', user);
          }
        });
    } catch (error) {
      console.log(error);
    }
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
router.delete('/user/:account_id/:email', (req, res) => {
  console.log(`id: ${req.params.account_id}`);
  console.log(`email: ${req.params.email}`);
  db.User.destroy({
    where: {
      id: req.params.account_id,
      email: req.params.email,
    },
  }).then((dbUser) => res.status(200).end());
});

// ROUTER TO UPDATE ACCOUNT
router.put('/user/:account_id', (req, res) => {
  console.log(req.body);
  db.User.update({
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
    role_id: req.body,
  }, {
    where: {
      id: req.params.account_id,
    },
  }).then((dbuser) => {
    res.json(dbuser);
  });
});

// PROFILE SEARCH BY ADMIN

router.get('/searchuser/:email', async (req, res) => {
  try {
    await db.sequelize.query('SELECT roles.role_name, user.* FROM user, roles WHERE user.role_id = roles.id AND user.email = :email', {
      replacements: { email: req.params.email },
      type: db.Sequelize.QueryTypes.SELECT,
    })
      .then((dbUser) => {
        console.log(dbUser);
        if (!dbUser) {
          res.status(404);
          return res.send('No User Found');
        }
        const newSearch = {
          searchedUser: dbUser[0],
          id: req.params.email,
          roleid: dbUser[0].role_id,
          isloggedin: req.isAuthenticated(),
        };
        console.log(newSearch);
        res.status(200);
        res.json(newSearch);
        // res.render('partials/manageUser', newSearch);
      });
  } catch (error) {
    res.status(404);
    return res.send('No User Found');
  }
});

module.exports = router;
