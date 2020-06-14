/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const express = require('express');
const db = require('../models');

const router = express.Router();

// ROUTE TO GET USER DETAILS OF SIGNED IN USER
router.get('/profile', async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      await db.sequelize.query('SELECT Roles.role_name, Users.* from Users, Roles where Users.role_id = Roles.id and Users.id = :id', {
        replacements: { id: req.session.passport.user },
        type: db.Sequelize.QueryTypes.SELECT,
      })
        .then((dbUser) => {
          const user = {
            userInfo: dbUser[0],
            id: req.session.passport.user,
            // roleid: dbUser[0].role_id,
            isloggedin: req.isAuthenticated(),
          };
          // console.log(user.userInfo);
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
  }).then((dbUser) => res.json(dbUser));
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
  }, {
    where: {
      id: req.params.account_id,
    },
  }).then((dbuser) => {
    res.json(dbuser);
  });
});

// ROUTE FOR ADMIN PAGE
// router.get('/admin', async (req, res) => {
//   if (req.isAuthenticated()) {
//     try {
//       await db.sequelize.query('SELECT Roles.role_name, Users.* from Users, Roles where 
//        Users.role_id = Roles.id and Roles.id = 1 and Users.id = :id', {
//         replacements: { id: req.session.passport.user },
//         type: db.Sequelize.QueryTypes.SELECT,
//       })
//         .then((dbUser) => {
//           const user = {
//             userInfo: dbUser[0],
//             id: req.session.passport.user,
//             roleid: dbUser[0].role_id,
//             isloggedin: req.isAuthenticated(),
//           };
//           res.render('userProfilepage', user);
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   } else {
//   // eslint-disable-next-line no-unused-vars
//     const user = {
//       id: null,
//       isloggedin: req.isAuthenticated(),
//     };
//     res.redirect('/');
//   }
// });


module.exports = router;
