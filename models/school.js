/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style

module.exports = function bar(sequelize, DataTypes) {
  const School = sequelize.define('School', {
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
    School.hasMany(models.User);
  };
  // , {
  //   foreignKey: 'school_id',
  //   onDelete: 'cascade',
  // }
  return School;
};
