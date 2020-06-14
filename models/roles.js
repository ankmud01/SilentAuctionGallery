module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    role_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 60],
      },
    },
    role_description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255],
      },
    },
  });

  Role.associate = function (models) {
    Role.hasMany(models.User, {
      foreignKey: 'role_id',
      onDelete: 'cascade',
    });
  };
  return Role;
};
