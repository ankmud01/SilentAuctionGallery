const express = require('express');
const session = require('express-session');
const process = require('process');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('express-flash');
const bodyParser = require('body-parser');
const passport = require('passport');
// const cookieParser = require('cookie-parser');
require('./config/passport')(passport);
require('dotenv').config();

const { pid } = process;
const PORT = process.env.PORT || 3000;
const db = require('./models');
console.log('Process PID: ', process.pid);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// We need to use sessions to keep track of our user's login status
app.use(
  session({
    key: 'user_sid',
    secret: process.env.SESSION_SECRET,
    // httpOnly: true,
    // need to understand this more
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: 600000,
    },
  })
);

// using passport and session
app.use(passport.initialize());
app.use(passport.session());
// Using flash for messages
app.use(flash());

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static('public'));
// Set Handlebars.

app.engine(
  'handlebars',
  exphbs({
    extname: 'handlebars',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: [
      //  path to your partials
      path.join(__dirname, 'views/partials'),
    ],
  })
);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// Import routes and give the server access to them.
const dashboardRoutes = require('./controllers/dashboard_controller.js');
const signupRoutes = require('./controllers/signup_controller.js');
const loginRoutes = require('./controllers/login_controller.js');
const donateRoutes = require('./controllers/donate_controller.js');
const profileRoutes = require('./controllers/profile_controller.js');

app.use(dashboardRoutes);
app.use(signupRoutes);
app.use(loginRoutes);
app.use(donateRoutes);
app.use(profileRoutes);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`PID: ${pid}\n`);
    console.log(
      '==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.',
      PORT,
      PORT
    );
  });
});

module.exports = express;
