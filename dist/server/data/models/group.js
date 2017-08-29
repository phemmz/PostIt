'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Group model
 * @param {*} sequelize
 * @param {*} DataTypes
 * @returns {*} Group
 */
exports.default = function (sequelize, DataTypes) {
  var Group = sequelize.define('Group', {
    groupname: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  });
  Group.associate = function (models) {
    Group.hasMany(models.Message, {
      foreignKey: 'groupId'
    });
    Group.belongsToMany(models.User, {
      foreignKey: 'groupId',
      through: 'UserGroups'
    });
  };
  return Group;
};