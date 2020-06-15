module.exports = function (sequelize, DataTypes) {
  const Artwork = sequelize.define('Artwork', {
    art_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 60],
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255],
      },
    },
    price: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false,
    },
    picture_link: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255],
      },
    },

  });

  Artwork.associate = function (models) {
    Artwork.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
  };

  return Artwork;
};
