/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
// Creating our school model
module.exports = function bar(sequelize, DataTypes) {
  const Bid = sequelize.define('Bid', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    artId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    artDesc: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    artCategory: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    startBid: {
      type: DataTypes.INTEGER,
    },
    highestBid: {
      type: DataTypes.INTEGER,
    },
    bidUserId: {
      type: DataTypes.STRING,
    },
    status: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });
  return Bid;
};
