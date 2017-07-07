module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Messages', {
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
<<<<<<< HEAD
    },    
=======
    },
>>>>>>> macsetup
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
