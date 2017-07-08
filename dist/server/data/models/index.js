'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var dotenv = require('dotenv');

var env = process.env.NODE_ENV || 'development';
var confi = require('../config/config');

var config = confi[env];

var basename = path.basename(module.filename);

var db = {};

dotenv.config();

var sequelize = void 0;
if (config.use_env_variable) {
  sequelize = new Sequelize(config.use_env_variable);
} else {
  sequelize = new Sequelize(config.url);
}

fs.readdirSync(__dirname).filter(function (file) {
  return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
}).forEach(function (file) {
  var model = sequelize.import(path.join(__dirname, file));
  db[model.name] = model;
});

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;