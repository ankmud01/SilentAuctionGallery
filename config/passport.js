/* eslint-disable no-unused-vars */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const db = require('../models');

// function initialize(passport) {
async function authenticateUser(email, password, done) {
  // // When a user tries to sign in this code runs
  db.User.findOne({
    where: {
      email,
    },
  }).then((dbUser) => {
    // If there's no user with the given email
    if (!dbUser) {
      return done(null, false, {
        message: 'Incorrect email.',
      });
    }
    // If there is a user with the given email, but the password the user gives us is incorrect
    try {
      if (bcrypt.compare(password, dbUser.password)) {
        return done(null, dbUser);
      }
      return done(null, false, { message: 'Incorrect Password' });
    } catch (err) {
      return done(err);
    }
  });
}

passport.use(new LocalStrategy({
  usernameField: 'email',
}, authenticateUser));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});
// }

// Exporting our configured passport
module.exports = passport;
