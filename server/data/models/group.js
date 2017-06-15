module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    groupname: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    users: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        Group.hasMany(models.Message, {
          foreignKey: 'messageId',
          as: 'messages',
        });        
      },
    },
  });
  return Group;
};