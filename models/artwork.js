/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style

module.exports = function bar(sequelize, DataTypes) {
  const Artwork = sequelize.define('Artwork', {
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

  Artwork.associate = (models) => {
    Artwork.hasMany(models.Bid, {
      foreignKey: 'artwork_id',
      onDelete: 'cascade',
    });
    Artwork.hasMany(models.OrderHdr, {
      foreignKey: 'artwork_id',
      onDelete: 'cascade',
    });
    Artwork.hasMany(models.OrderDtl, {
      foreignKey: 'artwork_id',
      onDelete: 'cascade',
    });
  };

  return Artwork;
};
