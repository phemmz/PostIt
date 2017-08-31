'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * View model
 * @param {*} sequelize
 * @param {*} DataTypes
 * @returns {*} View
 */
exports.default = function (sequelize, DataTypes) {
  var View = sequelize.define('View', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return View;
};