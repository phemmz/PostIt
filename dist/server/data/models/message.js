'use strict';

module.exports = function (sequelize, DataTypes) {
  var Message = sequelize.define('Messages', {
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
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function associate(models) {
        Message.belongsTo(models.Group, {
          foreignKey: 'groupId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Message;
};