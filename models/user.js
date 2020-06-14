/* eslint-disable func-names */
/* Requiring bcrypt for password hashing */

const bcrypt = require('bcrypt');
// Creating our User model
module.exports = function bar(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    // The email cannot be null, and must be a proper email before creation
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address2: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Bid, {
      foreignKey: 'user_id',
      onDelete: 'cascade',
    });
    User.hasMany(models.Artwork, {
      foreignKey: 'user_id',
      onDelete: 'cascade',
    });
    User.hasMany(models.OrderDtl, {
      foreignKey: 'user_id',
      onDelete: 'cascade',
    });
    User.hasMany(models.OrderHdr, {
      foreignKey: 'user_id',
      onDelete: 'cascade',
    });
  };

  // generating a hash
  User.generateHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);

  // checking if password is valid
  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  return User;
};
