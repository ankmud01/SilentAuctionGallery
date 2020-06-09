/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style

module.exports = function bar(sequelize, DataTypes) {
  const Bid = sequelize.define('Bid', {
    bidId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
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
    Bid.hasMany(models.OrderDtl, {
      onDelete: 'cascade',
    });
    Bid.hasMany(models.OrderHdr, {
      onDelete: 'cascade',
    });
    Bid.belongsTo(models.Artwork);
    Bid.belongsTo(models.User);
  };

  return Bid;
};
