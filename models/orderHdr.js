/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style

module.exports = function bar(sequelize, DataTypes) {
  const OrderHdr = sequelize.define('OrderHdr', {
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
  return OrderHdr;
};
