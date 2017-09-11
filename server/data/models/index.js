const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const dotenv = require('dotenv');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const basename = path.basename(module.filename);

const db = {};

dotenv.config();

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(config.use_env_variable);
} else {
  sequelize = new Sequelize(config.url);
}

fs
  .readdirSync(__dirname)
  .filter(file =>
    (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
