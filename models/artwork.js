/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style

module.exports = function bar(sequelize, DataTypes) {
  const Artwork = sequelize.define('Artwork', {
    artId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
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

  Artwork.associate = (models) => {
    Artwork.hasMany(models.Bid, {
      onDelete: 'cascade',
    });
    Artwork.hasMany(models.OrderDtl, {
      onDelete: 'cascade',
    });
    Artwork.hasMany(models.OrderHdr, {
      onDelete: 'cascade',
    });
    Artwork.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
    Artwork.belongsTo(models.School, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Artwork;
};
