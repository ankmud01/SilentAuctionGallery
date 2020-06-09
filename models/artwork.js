/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style

module.exports = function bar(sequelize, DataTypes) {
  const Artwork = sequelize.define('Artwork', {
    artId: {
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

  Artwork.associate = (models) => {
    Artwork.hasMany(models.Bid, {
      foreignKey: {
        allowNull: false,
      },
    });
    Artwork.hasMany(models.OrderHdr, {
      foreignKey: {
        allowNull: false,
      },
    });
    Artwork.hasMany(models.OrderDtl, {
      foreignKey: {
        allowNull: false,
      },
    });
    Artwork.hasMany(models.School, {
      foreignKey: {
        allowNull: false,
      },
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
    Artwork.belongsTo(models.Bid, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Artwork;
};
