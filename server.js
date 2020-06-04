const express = require('express');
const session = require('express-session');
const process = require('process');
const exphbs = require('express-handlebars');
const passport = require('./config/passport');

const { pid } = process;
const PORT = process.env.PORT || 3000;
const db = require('./models');

const app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static('public'));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Import routes and give the server access to them.
// const routes = require('./controllers/burger_controller.js');

// app.use(routes);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`PID: ${pid}\nApp now listening at localhost:${PORT}`);
});
