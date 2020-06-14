module.exports = (sequelize, DataTypes) => {
  const roles = sequelize.define('Roles', {
    roleName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  roles.associate = (models) => {
    // associations can be defined here
    roles.hasMany(models.User, {
      foreignKey: 'role_id',
      onDelete: 'cascade',
    });
  };
  return roles;
};
