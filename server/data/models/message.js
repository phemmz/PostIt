module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    content:{ 
      type: DataTypes.TEXT,
      allowNull: false,
    },
    readcheck: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    messageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        Message.belongsTo(models.Group, {
          foreignKey: 'messageId',
          onDelete: 'CASCADE',
        });
      },
    },
  });
  return Message;
};