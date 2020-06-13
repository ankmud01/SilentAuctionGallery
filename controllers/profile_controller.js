const express = require('express');
const db = require('../models');

const router = express.Router();

// ROUTE TO GET USER DETAILS OF SIGNED IN USER
router.get('/members' /* '/api/user' */, (req, res) => {
  if (req.isAuthenticated()) {
    db.User.findOne({
      where: {
        id: req.session.passport.user,
      },
    }).then((dbUser) => {
      const user = {
        userInfo: dbUser.dataValues,
        id: req.session.passport.user,
        isloggedin: req.isAuthenticated(),
      };
      console.log(user.userInfo);
      res.render('members', user);
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

module.exports = router;
