/* eslint-disable prefer-arrow-callback */
/* eslint-disable consistent-return */
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const db = require('../models');
require('dotenv').config();

const smtpTransport = require('../config/verify');

// const { checkNotAuthenticated } = require('../config/middleware/isAuthenticated');

const router = express.Router();

// HTML ROUTE FOR SIGNUP SCREEN
router.get('/signup', (req, res) => {
  req.headers.logged = 'false';
  res.render('signup', { title: 'Registration Page', school: 'North Oconee High School', logged: req.isAuthenticated() });
});

// ROUTE FOR PRIVACY POLICY
router.get('/privacypolicy', (req, res) => {
  res.render('privacypolicy', { title: 'Privacy Policy Page', school: 'North Oconee High School' });
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
let host;
let link;
let secretToken;
// user.value.secretToken = secretToken;
// user.value.active = false; // Flag account as inactive until verified
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/send', (req, res) => {
  console.log('Line 66 in Send route', req.body);
  if (req.isAuthenticated()) {
    db.User.findOne({
      where: {
        id: req.session.passport.user,
      },
    }).then((dbUser) => {
      const user = {
        userInfo: dbUser.dataValues,
        id: req.session.passport.user,
        secretToken: dbUser.secretToken,
        isloggedin: req.isAuthenticated(),
      };
      console.log('Line 79 User.Info:', user.userInfo);
      res.send(user.secretToken);
      secretToken = user.secretToken;
    }).then(() => {
      // eslint-disable-next-line prefer-template
      link = 'http://localhost:3000/verify?id=' + secretToken;
      console.log('Link: ', link);
      // link = `http://${req.get(host)}/verify?id=${rand}`;
      mailOptions = {
        from: '"Silent Auction Gallery" <silentauctiongallery@gmail.com>',
        to: req.body.to,
        subject: 'Silent Auction Gallery is asking you to confirm your Email account',
        // eslint-disable-next-line prefer-template
        html: 'Hi there,<br> Please Click on the link to verify your email. <br><a href=' + link + '>Click here to verify</a>',
      };
      console.log('Sent by:', process.env.GMAIL_USERNAME);
      console.log('Line 87 signup_controller.js: ', mailOptions);
      // eslint-disable-next-line func-names
      smtpTransport.sendMail(mailOptions, (error, info) => {
        try {
          smtpTransport.sendEmail({
            mailOptions,
          },
          console.log('Message %s sent: %s', info.messageId, info.response));
        } catch (err) {
          console.log(err);
          throw error;
        }
      });
    });
    //   smtpTransport.sendMail(mailOptions, function (error, info) {
    //     if (error) {
    //       console.log(error);
    //     } else {
    //       console.log(`Email sent: ${info.response}`);
    //     }
    //   });
    // }).catch((error) => console.log('error: ', error));
  } else {
    const user = {
      id: null,
      isloggedin: req.isAuthenticated(),
    };
    res.redirect('/');
  }
});

router.get('/verify', (req, res) => {
  host = 'localhost:3000';
  console.log('<----------------------------------Req.body: ', req.body);
  res.render('verifytoken');
})
  // eslint-disable-next-line prefer-template
  // console.log(req.protocol + ':/' + req.get('host'));
  // eslint-disable-next-line prefer-template
  .post(async (req, res, next) => {
    try {
      secretToken = req.body;

      // Find account with matching secret Token
      const user = await User.findOne({ secretToken });
      if (parseInt(req.query.id, 10) === secretToken) {
        // res.render('verifytoken', { title: 'Verification', school: 'North Oconee Highschool' });
        //  console.log('email is verified');

        if (!user) {
          req.flash('Error, No user found.');
          res.redirect('/signup');
          return;
        }
        user.active = true;
        user.secretToken = '';
        await user.save();

        req.flash('Success', 'Thank you! Now you can Login.');
        res.redirect('/login');
      }
    } catch (error) {
      next(error);
    }
  });

//   if ((req.protocol + '://' + req.get('host')) === ('http://' + host)) {
//     console.log('Domain is matched. Information is from Authentic email. secretToken:', req.query.id === secretToken);
//     if (parseInt(req.query.id, 10) === secretToken) {
//       res.render('verifytoken', { title: 'Verification', school: 'North Oconee Highschool' });
//       console.log('email is verified');
//       try {
//         db.user.update({
//           active: 1,
//         },
//         {
//           where: {
//             email: req.body.email,
//           },
//         });
//       } catch (err) {
//         console.log(err);
//       }
//     }
//       }(req, res, next);
//       // eslint-disable-next-line spaced-comment
//       res.end('members, <h1>Email ' + mailOptions.to + ' has been Successfully verified');
//     } else {
//       console.log('email is not verified');
//       res.end('<h1>Bad Request</h1>');
//     }
//   } else {
//     res.end('<h1>Request is from unknown source');
//   }

// });

module.exports = router;
