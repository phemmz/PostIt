module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        Users.belongsTo(models.Group, {
          foreignKey: 'groupId',
          onDelete: 'CASCADE',
        });        
      },      
    },
  });
  return User;
};