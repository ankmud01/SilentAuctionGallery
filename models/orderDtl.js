/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style

module.exports = function bar(sequelize, DataTypes) {
  const OrderDtl = sequelize.define('OrderDtl', {
    orderd: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    qty: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.STRING,
    },
  });

  OrderDtl.associate = (models) => {
    OrderDtl.belongsTo(models.Bid, {
      foreignKey: {
        allowNull: false,
      },
    });
    OrderDtl.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
    OrderDtl.belongsTo(models.Artwork, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return OrderDtl;
};
