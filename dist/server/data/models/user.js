'use strict';

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (sequelize, DataTypes) {
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
    }
  });

  User.beforeCreate(function (User, options) {
    User.password = _bcryptNodejs2.default.hashSync(User.password);
  });

  User.afterCreate(function (User, options) {
    // console.log('Account created');
  });

  User.associate = function (models) {
    User.belongsToMany(models.Group, {
      foreignKey: 'userId',
      through: 'UserGroups'
    });
  };
  return User;
};