/* eslint-disable camelcase */
/* eslint-disable consistent-return */
function authRole(role_id) {
  return (req, res, next) => {
    if (req.User.role_id !== role_id) {
      res.status(401);
      return res.send('User is not Authorized..');
    }
    next();
  };
}

module.exports = authRole;
