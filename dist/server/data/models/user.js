'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Group model
 * @param {*} sequelize
 * @param {*} DataTypes
 * @returns {*} User
 */
exports.default = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      isEmail: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      len: [5, 30],
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    verificationCode: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true
    }
  });

  User.beforeCreate(function (User) {
    User.password = _bcryptNodejs2.default.hashSync(User.password);
  });

  User.associate = function (models) {
    User.belongsToMany(models.Group, {
      foreignKey: 'userId',
      through: 'UserGroups'
    });
  };
  return User;
};