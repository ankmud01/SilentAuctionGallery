// require('dotenv').config(); moved to dev-dependency must run "node -r dotenv/config server.js"

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    socketPath: '/var/run/mysqld/mysqld.sock',
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectModule: 'mysql2',
  },
  // production: {
  //   username: process.env.DB_USER,
  //   password: process.env.DB_PASSWORD,
  //   database: process.env.DB_NAME,
  //   host: process.env.DB_HOST,
  //   dialect: 'mysql',
  //   dialectModule: 'mysql2',
  // },
  production: {
    use_env_variable: 'JAWSDB_URL',
    dialect: 'mysql',
  },
};
