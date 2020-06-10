/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style

module.exports = function bar(sequelize, DataTypes) {
  const School = sequelize.define('School', {
    schoolId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    schoolName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    address: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    state: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    zip: {
      type: DataTypes.STRING,
    },
  });

  School.associate = (models) => {
    School.hasMany(models.Artwork, {
      foreignKey: {
        allowNull: false,
      },
    });
    School.hasMany(models.User, {
      onDelete: 'cascade',
    });
  };
  return School;
};
