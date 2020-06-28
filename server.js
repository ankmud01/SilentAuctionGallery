const express = require('express');
const session = require('express-session');
const process = require('process');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('express-flash');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const passport = require('passport');
const fileupload = require('express-fileupload');
const os = require('os');
const compression = require('compression');


if (process.env.JAWSDB_URL) {
  mysql.createConnection(process.env.JAWSDB_URL);
}

// const cookieParser = require('cookie-parser');
require('./config/passport')(passport);
// require('dotenv').config(); move to a dev-dependency must run "node -r dotenv/config server.js"
// or "npm run start_local"

const { pid } = process;
const PORT = process.env.PORT || 3000;
const db = require('./models');

console.log('Process PID: ', process.pid);

const app = express();

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false;
  }
  // fallback to standard filter function
  return compression.filter(req, res);
}

app.use(compression({ filter: shouldCompress }));

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
  }),
);

// using passport and session
app.use(passport.initialize());
app.use(passport.session());
// Using flash for messages
app.use(flash());

// attempt to use express-flash
app.all('/session-flash', (req, res) => {
  req.session.sessionFlash = {
    type: 'success',
    message: 'Your file was successfully Uploaded to the server.',
  };
  res.render(200, 'artGallery', { title: 'Art Gallery' });
});


// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static('public'));
// Set Handlebars.

app.engine(
  'handlebars',
  exphbs({
    // extname: 'handlebars',
    defaultLayout: 'main',
    // layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: [
      //  path to your partials
      path.join(__dirname, 'views/partials'),
    ],
  }),
);
// app.set('views', path.join(__dirname, 'views'));
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

app.use(fileupload({ safeFileNames: true, preserveExtension: 3 }));

// eslint-disable-next-line consistent-return
app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).render('artGallery');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  const { sampleFile } = req.files;
  console.log('Is there a file: ', req.files, req.files.sampleFile.name);
  const file = req.files.sampleFile.name;

  // Use the mv() method to place the file somewhere on your server
  // eslint-disable-next-line consistent-return
  sampleFile.mv(`./public/upload/${file}`, (err) => {
    if (err) return res.status(500).send(err);
    console.log('The file Name:', file);
    req.flash('success_msg', 'File Uploaded');
    res.status(200).render('artGallery');
  });
});

const hostname = os.hostname();
console.log('Line 112 server.js-What env am I in: ', process.env.NODE_ENV);
// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`PID: ${pid}\n`);
    if (process.env.NODE_ENV === 'development') {
      console.log(
        `==> 🌎  Listening on port %s. Visit http://${hostname}:%s/ in your browser.`,
        PORT,
        PORT,
      );
    } else {
      console.log(
        '==> 🌎  Listening on port %s. Visit http://silentauctiongallery.herokuapp.com/ in your browser and running on port: %s .',
        PORT,
        PORT,
      );
    }
  });
})
  .catch((err) => {
    console.log(err);
  });


module.exports = express;
