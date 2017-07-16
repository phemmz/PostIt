'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Message = sequelize.define('Message', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    readcheck: {
      type: DataTypes.BOOLEAN
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER
  });
  Message.associate = function (models) {
    Message.belongsTo(models.Group, {
      foreignKey: 'groupId',
      onDelete: 'CASCADE'
    });
    Message.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return Message;
};