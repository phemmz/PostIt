'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.addColumn('Users', 'groupname', {
      type: Sequelize.STRING,
      allowNull: false
    });
  },
  down: function down(queryInterface /*, Sequelize*/) {
    return queryInterface.dropTable('Users');
  }
};