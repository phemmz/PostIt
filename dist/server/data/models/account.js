'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (sequelize, DataTypes) {
  var Account = sequelize.define('Account', {
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
    }
  });

  Account.beforeCreate(function (Account, options) {
    Account.password = _bcryptNodejs2.default.hashSync(Account.password);
  });

  Account.afterCreate(function (Account, options) {
    // console.log('Account created');
  });
  return Account;
};