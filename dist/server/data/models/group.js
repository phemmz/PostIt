'use strict';

<<<<<<< HEAD
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = function (sequelize, DataTypes) {
=======
Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
>>>>>>> macsetup
  var Group = sequelize.define('Group', {
    groupname: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function associate(models) {
        Group.hasMany(models.Message, {
          foreignKey: 'groupId',
          as: 'messages'
        });
        Group.hasMany(models.Users, {
          foreignKey: 'groupId',
          as: 'users'
        });
      }
    }
  });
  return Group;
};