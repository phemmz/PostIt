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
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        Message.belongsTo(models.Group, {
          foreignKey: 'groupId',
          onDelete: 'CASCADE',
        });
      },
    },
  });
  return Message;
};