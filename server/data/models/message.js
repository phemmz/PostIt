export default (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    readcheck: {
      type: DataTypes.BOOLEAN
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER
  });
  Message.associate = (models) => {
    Message.belongsTo(models.Group, {
      foreignKey: 'groupId',
      onDelete: 'CASCADE',
    });
    Message.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return Message;
};
