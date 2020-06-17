/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style

module.exports = function bar(sequelize, DataTypes) {
  const Bid = sequelize.define('Bid', {
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
    Bid.hasMany(models.OrderHdr, {
      foreignKey: 'bid_id',
      onDelete: 'cascade',
    });
    Bid.hasMany(models.OrderDtl, {
      foreignKey: 'bid_id',
      onDelete: 'cascade',
    });
  };

  return Bid;
};
