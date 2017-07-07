'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = {
  up: function up(queryInterface, Sequelize) {
    var _queryInterface$creat;

    return queryInterface.createTable('Messages', (_queryInterface$creat = {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      priority: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      readcheck: {
        type: Sequelize.BOOLEAN
      }
    }, _defineProperty(_queryInterface$creat, 'priority', {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }), _defineProperty(_queryInterface$creat, 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE
    }), _defineProperty(_queryInterface$creat, 'updatedAt', {
      allowNull: false,
      type: Sequelize.DATE
    }), _defineProperty(_queryInterface$creat, 'groupId', {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Groups',
        key: 'id',
        as: 'groupId'
      }
    }), _queryInterface$creat));
  },
  down: function down(queryInterface /*, Sequelize*/) {
    return queryInterface.dropTable('Messages');
  }
};