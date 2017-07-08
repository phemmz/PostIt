require('dotenv').config();

module.exports = {
  development: {
    username: 'fckkvrqx',
    password: 'FZc_QCJLZxz1-usz0L-gDb5U_ipzPThj',
    database: 'fckkvrqx',
    host: 'pellefant.db.elephantsql.com',
    port: 5432,
    dialect: 'postgres'
  },
  test: {
    username: 'fckkvrqx',
    password: 'FZc_QCJLZxz1-usz0L-gDb5U_ipzPThj',
    database: 'fckkvrqx',
    host: 'pellefant.db.elephantsql.com',
    port: 5432,
    dialect: 'postgres'
  },
  production: {
    use_env_variable: process.env.PRODUCTION_URL,
    dialect: 'postgres'
  },
};
