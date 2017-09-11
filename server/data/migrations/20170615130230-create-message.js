module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      priority: {
        type: Sequelize.STRING,
        allowNull: false
      },
      readcheck: {
        type: Sequelize.BOOLEAN
      },
      messagecreator: {
        type: Sequelize.TEXT
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE'
      },
      groupId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    }),
  down: queryInterface /* , Sequelize*/ =>
    queryInterface.dropTable('Messages'),
};
