'use strict';

module.exports = function (sequelize, DataTypes) {
  var UserGroup = sequelize.define('UserGroup', {
    userId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER
  });
  return UserGroup;
};