'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: ["^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])"], //RegEx to increase password strength
      len: [8, 40]
    },
    role: DataTypes.STRING//foreign key
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};