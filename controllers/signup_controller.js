/* eslint-disable prefer-arrow-callback */
/* eslint-disable consistent-return */
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const db = require('../models');
require('dotenv').config();

const smtpTransport = require('../config/verify'); // { sendMail }
const PORT = process.env.PORT || 3000;
// const { checkNotAuthenticated } = require('../config/middleware/isAuthenticated');

const router = express.Router();

// HTML ROUTE FOR SIGNUP SCREEN
router.get('/signup', (req, res) => {
  req.headers.logged = 'false';
  res.render('signup', {
    title: 'Registration Page',
    school: 'North Oconee High School',
    logged: req.isAuthenticated(),
  });
});

// ROUTE FOR PRIVACY POLICY
router.get('/privacypolicy', (req, res) => {
  res.render('privacypolicy', {
    title: 'Privacy Policy Page',
    school: 'North Oconee High School',
  });
});

// ROUTE TO SIGNUP A NEW USER
router.post('/api/signup', (req, res, next) => {
  passport.authenticate('local-signup', (err, user, info) => {
    console.log('info', info);
    if (err) {
      console.log('passport err', err);
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (!user) {
      console.log('user error', user);
      return res.send({ success: false, message: 'authentication failed' });
    }
    req.login(user, (loginErr) => {
      if (loginErr) {
        console.log('loginerr', loginErr);
        return next(loginErr);
      }
      console.log('redirecting....');
      res.cookie('first_name', user.first_name);
      res.cookie('user_id', user.id);
      req.flash('success_msg', 'You are now registered');
      return res.redirect('/dashboard');
    });
  })(req, res, next);
});

// Email verification
let mailOptions;
let link;
let secretToken;
// user.value.secretToken = secretToken;
// user.value.active = false; // Flag account as inactive until verified
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/send', (req, res) => {
  console.log('Line 72 in Send route', req.body);
  if (req.isAuthenticated()) {
    db.User.findOne({
      where: {
        id: req.session.passport.user,
      },
    })
      .then((dbUser) => {
        const user = {
          userInfo: dbUser.dataValues,
          id: req.session.passport.user,
          secretToken: dbUser.secretToken,
          isloggedin: req.isAuthenticated(),
        };
        console.log('Line 79 User.Info:', user.userInfo);
        res.send(user.secretToken);
        secretToken = user.secretToken;
      })
      .then(() => {
        // eslint-disable-next-line prefer-template
        link = 'http://localhost:' + PORT + '/verify?id=' + secretToken;
        console.log('Link: ', link);
        // link = `http://${req.get(host)}/verify?id=${rand}`;
        mailOptions = {
          from: '"Silent Auction Gallery" <silentauctiongallery@gmail.com>',
          to: req.body.to,
          subject:
            'Silent Auction Gallery is asking you to confirm your Email account',
          // eslint-disable-next-line prefer-template
          html: `Hi there,<br> Copy this token:<br><b>${secretToken}</b><br>and paste it into the Verification page at the link below.<br>
          Please Click on the link to verify your email. <br><a href=${link}>Click here to verify</a>`,
        };
        console.log('Sent by:', process.env.GMAIL_USERNAME);
        console.log('Line 87 signup_controller.js: ', mailOptions);
        // eslint-disable-next-line func-names
        // eslint-disable-next-line no-unused-vars
        smtpTransport.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log('Error happened!!!');
            res.status(500).json({ message: 'Error happened!!' });
          } else {
            console.log('Email sent!!!');
            res.json({ message: 'Email sent!!' });
          }
        });
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

secretToken = ''; // to clear for verify
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router
  // eslint-disable-next-line no-unused-vars
  .get('/verify', (req, res, next) => {
    console.log('<----------------------------------Req.body: ', req.body);
    res.render('verifytoken', { title: 'Verify Email Page' });
  })
  // eslint-disable-next-line prefer-template
  // console.log(req.protocol + ':/' + req.get('host'));
  // eslint-disable-next-line prefer-template
  .post('/verify', async (req, res, next) => {
    try {
      secretToken = req.body;

      console.log('Line 141 ----->secretToken:', secretToken);
      // Find account with matching secret Token
      const user = await db.User.findOne({
        where: {
          secretToken: secretToken.secretToken,
        },
      });
      if (!user.dataValues.secretToken || user.dataValues.active === 1 || user.dataValues.secretToken === ' ') {
        req.flash('You have either already confirmed your account OR you may need to register');
        return res.status(404).redirect('/signup', { title: 'Register Page' });
      }
      console.log('Line 149------->User db output:', user.dataValues.secretToken);
      console.log('line 145 ------>User db active output:', user.dataValues.active);

      if (user.dataValues.secretToken === secretToken.secretToken) {
        console.log('Domain is matched. Information is from Authentic email. secretToken:',
          req.query.id === secretToken);
        console.log('email is verified');
        console.log('In Verify Route and user: ', user);
        if (!user) {
          console.log('*****************User NOT Found!!!****************');
          // res.;
          req.flash('Error, No user found.');
          res.status(401).redirect('/signup');
          return;
        }
        const condition = {
          where: {
            secretToken: secretToken.secretToken,
          },
        };
        console.log('Condition----->: ', condition);
        db.User.update(
          {
            secretToken: null,
            active: true,
          },
          condition,
          function (result) {
            console.log('============>', result);
            if (result.changedRows === 0) {
              req.flash('You have either already confirmed your account OR you may need to register', 'I did NOT find you in our database.');
              return res.status(404).end();
            }
            req.flash('Success', 'Thank you! Now you can Login.');
            res.redirect('/login').status(200);
          },
        );

        req.flash('Success', 'Thank you! Now you can Login.');
        res.redirect('/signup');
      } else {
        req.flash('Success', 'Thank you! Now you can Login.');
        res.redirect('/login');
      }
    } catch (error) {
      throw new Error('BROKEN-DID NOT CATCH THE NULL VALUE');
      // eslint-disable-next-line no-unreachable
      next(error);
    }
  });

//   if ((req.protocol + '://' + req.get('host')) === ('http://' + host)) {

module.exports = router;
