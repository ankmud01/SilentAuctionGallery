/* eslint-disable func-names */
/* Requiring bcrypt for password hashing */
const randomstring = require('randomstring');
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
      allowNull: true,
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
    school: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    secretToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
    },
  },
  {
    underscored: true,
    tableName: 'user',
    // freezeTableName: true,
  });

  User.associate = function (models) {
    User.hasMany(models.Artwork, {
      foreignKey: 'user_id',
      onDelete: 'cascade',
    });
  };

  User.associate = function (models) {
    User.belongsTo(models.Role); // changed from hasOne
    //   , {
    //   foreignKey: 'role_id',
    // }
  };

  User.associate = function (models) {
    User.belongsTo(models.School);
    //  , {
    //   foreignKey: 'role_id',
    // });
  };

  // generating a hash
  User.generateHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);

  // checking if password is valid
  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Generate SecretToken for Email verification
  User.secretToken = randomstring.generate({ length: 64, charset: 'alphanumeric' });
  console.log('Just Generated secretToken:', User.secretToken);
  return User;
};
