/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style

module.exports = function bar(sequelize, DataTypes) {
  const OrderDtl = sequelize.define('OrderDtl', {
    qty: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.STRING,
    },
  });
  return OrderDtl;
};
