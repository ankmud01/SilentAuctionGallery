/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style

module.exports = function bar(sequelize, DataTypes) {
  const Bid = sequelize.define('Bid', {
    bidId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    startBid: {
      type: DataTypes.INTEGER,
    },
    bids: {
      type: DataTypes.INTEGER,
    },
    status: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });

  Bid.associate = (models) => {
    Bid.hasMany(models.Artwork, {
      foreignKey: {
        allowNull: false,
      },
    });
    Bid.hasMany(models.OrderHdr, {
      foreignKey: {
        allowNull: false,
      },
    });
    Bid.hasMany(models.OrderDtl, {
      foreignKey: {
        allowNull: false,
      },
    });
    Bid.belongsTo(models.Artwork, {
      foreignKey: {
        allowNull: false,
      },
    });
    Bid.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Bid;
};
