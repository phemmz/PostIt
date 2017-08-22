'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * UserGroup model
 * @param {*} sequelize
 * @param {*} DataTypes
 * @returns {*} UserGroup
 */
exports.default = function (sequelize, DataTypes) {
  var UserGroup = sequelize.define('UserGroup', {
    userId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER
  });
  return UserGroup;
};