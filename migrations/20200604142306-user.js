/* eslint-disable arrow-body-style */

module.exports = {
  // eslint-disable-next-line arrow-body-style
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      first_name: {
        type: Sequelize.STRING,
      },
      last_name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      address2: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      state: {
        type: Sequelize.STRING,
      },
      zip: {
        type: Sequelize.STRING,
      },
      school: {
        type: Sequelize.STRING,
      },
      role_id: {
        type: Sequelize.INTEGER,
        references: {
          mode: 'roles',
          key: 'id',
        },
      },
    });
  },
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line arrow-body-style
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => { return queryInterface.dropTable('users'); },
  /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
    */
};
