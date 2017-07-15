require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DB_URL,
    dialect: 'postgres'
  },
  test: {
    url: process.env.TESTDB_URL,
    dialect: 'postgres'
  },
  production: {
    use_env_variable: process.env.PRODUCTION_URL,
    dialect: 'postgres'
  },
};
