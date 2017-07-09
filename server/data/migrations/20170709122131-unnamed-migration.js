'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('Users', 'groupname', {
      type: Sequelize.STRING,
      allowNull: false
    }),
  down: (queryInterface /*, Sequelize*/) => 
    queryInterface.dropTable('Users'),
};
