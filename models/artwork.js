/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
// Creating our school model
module.exports = function bar(sequelize, DataTypes) {
  const Artwork = sequelize.define('Artwork', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    artName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    aboutArt: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    category: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    artistName: {
      type: DataTypes.STRING,
    },
  });
  return Artwork;
};
