'use strict';

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function associate(models) {
        User.belongsTo(models.Group, {
          foreignKey: 'groupId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return User;
};