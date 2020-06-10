module.exports = (sequelize, DataTypes) => {
  const roles = sequelize.define('Roles', {
    roleId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
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
      onDelete: 'cascade',
    });
  };
  return roles;
};
