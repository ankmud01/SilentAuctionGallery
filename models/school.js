/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
// Creating our school model
module.exports = function bar(sequelize, DataTypes) {
  const School = sequelize.define('School', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    schoolName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    address: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    state: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    zip: {
      type: DataTypes.STRING,
    },
    adminName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });
  return School;
};
