/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style

module.exports = function bar(sequelize, DataTypes) {
  const OrderHdr = sequelize.define('OrderHdr', {
    orderId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    orderStatus: {
      type: DataTypes.STRING,
    },
    paymentMethod: {
      type: DataTypes.STRING,
    },
    externalRefId: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    tranDate: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  });

  OrderHdr.associate = (models) => {
    OrderHdr.belongsTo(models.Artwork, {
      foreignKey: {
        allowNull: false,
      },
    });
    OrderHdr.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
    OrderHdr.belongsTo(models.Bid, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return OrderHdr;
};
