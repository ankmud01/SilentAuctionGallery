module.exports = (sequelize, DataTypes) => {
  const roles = sequelize.define('Roles', {
    role: DataTypes.STRING,
  });
  roles.associate = (models) => {
    // associations can be defined here
    roles.hasMany(models.User);
  };
  return roles;
};
