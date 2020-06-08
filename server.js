const express = require('express');
const session = require('express-session');
const process = require('process');
const exphbs = require('express-handlebars');
const path = require('path');
const passport = require('./config/passport');

const { pid } = process;
const PORT = process.env.PORT || 3000;
const db = require('./models');

const app = express();

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }),
);
app.use(passport.initialize());
app.use(passport.session());

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static('public'));
// Set Handlebars.

app.engine(
  'handlebars',
  exphbs({
    extname: 'handlebars',
    defaultLayout: 'main2',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: [
      //  path to your partials
      path.join(__dirname, 'views/partials'),
    ],
  }),
);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// Import routes and give the server access to them.
const routes = require('./controllers/login_controller.js');

app.use(routes);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`PID: ${pid}\n`);
    console.log(
      '==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.',
      PORT,
      PORT,
    );
  });
});

// app.listen(PORT, () => {
//   // eslint-disable-next-line no-console
//   console.log(`PID: ${pid}\nApp now listening at localhost:${PORT}`);
// });

module.exports = express;
