// This is middleware for restricting routes a user is not allowed to visit if not logged in
exports.checkAuthenticated = function authenticated(req, res, next) {
  // If the user is logged in, continue with the request to the restricted route
  if (req.isAuthenticated()) {
    console.log('<-------------------------------here it isAuthenticated---------------------------------------->');
    return next();
  }

  // If the user isn't logged in, redirect them to the signup page
  return res.redirect('/signup');
};

exports.checkNotAuthenticated = function notAuthenticated(req, res, next) {
  // If the user is logged in and clicks on login again then redirect them to dashboard
  if (req.isAuthenticated()) {
    console.log('++++++++++++++++++++++++++++++++++++notAuthenticated+++++++++++++++++++++++++++++++++++++++++++++');
    return res.redirect('/');
  }

  // If the user isn't logged in, redirect them to the login page
  return next();
};
