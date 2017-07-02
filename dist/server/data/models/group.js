'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = function (sequelize, DataTypes) {
  var Group = sequelize.define('Groups', {
    groupname: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: _defineProperty({
      associate: function associate(models) {
        Group.hasMany(models.Message, {
          foreignKey: 'groupId',
          as: 'messages'
        });
      }
    }, 'associate', function associate(models) {
      Group.hasMany(models.Users, {
        foreignKey: 'groupId',
        as: 'users'
      });
    })
  });
  return Group;
};